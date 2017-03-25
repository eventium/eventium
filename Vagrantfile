# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
  config.vm.box = 'ubuntu/trusty64'

  config.vm.provider 'virtualbox' do |v|
    v.memory = 1024
  end

  config.vm.network 'forwarded_port', guest: 3000, host: 3000

  config.vm.provision 'chef_solo' do |chef|
    chef.cookbooks_path = 'chef/cookbooks'
    chef.add_recipe 'eventium'
    chef.add_recipe 'eventium::postgresql'
    chef.add_recipe 'eventium::nodejs'
    chef.add_recipe 'eventium::nginx'
  end

  config.vm.synced_folder './', '/home/eventium'
end
