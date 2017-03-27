# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu/xenial64'
  config.vm.box_version = '>= 20160921.0.0'

  config.vm.provider 'virtualbox' do |v|
    v.memory = 1024
  end

  config.vm.network 'forwarded_port', guest: 3000, host: 3000, host_ip: "127.0.0.1"

  config.vm.provision 'chef_solo' do |chef|
    chef.cookbooks_path = 'chef/cookbooks'
    chef.add_recipe 'eventium'
    chef.add_recipe 'eventium::postgresql'
    chef.add_recipe 'eventium::nginx'
    chef.add_recipe 'eventium::nodejs'
  end

  config.vm.synced_folder './', '/home/eventium'
end
