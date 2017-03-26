name 'eventium'
maintainer 'The Authors'
maintainer_email 'you@example.com'
license 'all_rights'
description 'Installs/Configures cmpt470'
long_description 'Installs/Configures Eventium'
version '0.1.0'

recipe 'eventium', ''
recipe 'eventium::postgresql', ''
recipe 'eventium::nodejs', ''
recipe 'eventium::nginx', ''

# The `issues_url` points to the location where issues for this cookbook are
# tracked.  A `View Issues` link will be displayed on this cookbook's page when
# uploaded to a Supermarket.
#
# issues_url 'https://github.com/<insert_org_here>/cmpt470/issues' if respond_to?(:issues_url)

# The `source_url` points to the development reposiory for this cookbook.  A
# `View Source` link will be displayed on this cookbook's page when uploaded to
# a Supermarket.
#
# source_url 'https://github.com/<insert_org_here>/cmpt470' if respond_to?(:source_url)
