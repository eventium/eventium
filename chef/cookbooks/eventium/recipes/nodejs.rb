bash 'install_nodejs' do
	cwd '/'
	code <<-EOH
		wget -qO- https://deb.nodesource.com/setup_7.x | sudo bash -
	EOH
end

apt_package 'nodejs'

execute 'install_npm' do
	cwd node['app']['user']['home_dir']
  command "npm install --no-bin-links"
end

execute 'build_app' do
  cwd node['app']['user']['home_dir']
  command "npm run build"
end

# Add a service file for running the music app on startup
cookbook_file "eventium.service" do
  path "/etc/systemd/system/eventium.service"
end

# Start the music app
execute "start_eventium" do
  command "sudo systemctl start eventium"
end

# Start music app on VM startup
execute "startup_musicapp" do
  command "sudo systemctl enable eventium"
end
