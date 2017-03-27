apt_package 'postgresql'

db_script_path = '/tmp/setup.sql'

cookbook_file 'db_setup' do
	path db_script_path
	source 'db/setup.sql'
	mode '0755'
	owner node['app']['user']['username']
	group node['app']['group']['name']
	action :nothing
end

bash 'create_db' do
	cwd '/etc/postgresql'
	user 'postgres'
	code <<-EOH
		psql postgres -c "CREATE DATABASE #{node['postgresql']['database_name']}"
		psql -U postgres -d #{node['postgresql']['database_name']} -f #{db_script_path}
	EOH
	notifies :create, 'cookbook_file[db_setup]', :before
end

ruby_block 'get_postgresql_conf_path' do
    block do
        Chef::Resource::RubyBlock.send(:include, Chef::Mixin::ShellOut)
        command = 'sudo -u postgres psql -c "SHOW hba_file;" | grep /etc/'
        command_out = shell_out(command)
        node.set['postgresql']['conf']['path'] = command_out.stdout
    end
    action :create
end

cookbook_file 'create_postgresql_conf' do
	path node['postgresql']['conf']['path']
	source 'postgresql/pg_hba.conf'
	mode '0640'
	owner 'postgres'
	group 'postgres'
	action :create
end

service 'postgresql' do
	action :restart
end