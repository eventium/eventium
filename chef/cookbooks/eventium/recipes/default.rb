#
# Cookbook:: cmpt470
# Recipe:: default
#
# Copyright:: 2017, The Authors, All Rights Reserved.

apt_update 'all platforms' do
  action :update
end

group node['app']['group']['name'] do
	action :create
end

user node['app']['user']['username'] do
	group node['app']['group']['name']
	home node['app']['user']['home_dir']
	non_unique false
	password node['app']['user']['password']
	shell node['app']['user']['shell']
	system true
	action :create
end