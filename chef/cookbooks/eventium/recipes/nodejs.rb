bash 'install_nodejs' do
	cwd '/'
	code <<-EOH
		wget -qO- https://deb.nodesource.com/setup_7.x | sudo bash -
	EOH
end

apt_package 'nodejs'

bash 'install_npm' do
	cwd node['app']['user']['home_dir']
	code <<-EOH
		npm install
	EOH
end