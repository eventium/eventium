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
