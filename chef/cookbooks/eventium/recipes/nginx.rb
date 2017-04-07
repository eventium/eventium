apt_package 'nginx'

# Using custon nginx settings. We need to turn off sendfile: https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
cookbook_file "nginx.conf" do
  path "/etc/nginx/nginx.conf"
  mode '0755'
end

# Moving config files
cookbook_file "eventium.conf" do
  path "/etc/nginx/sites-available/eventium.conf"
  mode '0755'
end

# Enabling the config
link '/etc/nginx/sites-enabled/eventium.conf' do
  to '/etc/nginx/sites-available/eventium.conf'
end

bash 'restart_nginx' do
  cwd '/'
  code <<-EOH
    sudo nginx -s reload
  EOH
end

