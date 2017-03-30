bash 'install_nodejs' do
	cwd '/'
	code <<-EOH
		wget -qO- https://deb.nodesource.com/setup_7.x | sudo bash -
	EOH
end

apt_package 'nodejs'

execute 'install_npm' do
	cwd node['app']['user']['home_dir']
  command "npm install"
end

execute 'build_app' do
  cwd node['app']['user']['home_dir']
  command "npm run build"
end

execute 'populate_db' do
  cwd node['app']['user']['home_dir']
  command "npm run populate"
end

# Add a service file for running the music app on startup
cookbook_file "eventium.service" do
  path "/etc/systemd/system/eventium.service"
end

# Start the app
execute "start_eventium" do
  command "sudo systemctl start eventium"
end

# Start the app on VM startup
execute "start_eventium" do
  command "sudo systemctl enable eventium"
end
