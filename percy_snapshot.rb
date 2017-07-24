require 'percy/capybara/anywhere'
ENV['PERCY_DEBUG'] = '1'  # Enable debugging output.
ENV['PERCY_TOKEN'] = '89e910b3c5916accb683e5a524fe0ac9b48adbdfb4ac7b64d526c241f9b40461'
ENV['PERCY_PROJECT'] = 'Commoner/Redux-PDiff'

# Configuration.
server = 'http://localhost:5000'
assets_dir = File.expand_path('../build', __FILE__)
assets_base_url = '/'

Percy::Capybara::Anywhere.run(server, assets_dir, assets_base_url) do |page|
  page.visit('/')
  Percy::Capybara.snapshot(page, name: 'homepage')

  page.visit('/?todosMockData=more')
  Percy::Capybara.snapshot(page, name: 'more', widths: [420, 1280])

  page.visit('/?todosMockData=more&filterMockData=show_completed')
  Percy::Capybara.snapshot(page, name: 'more + completed')

  # TODO: uncomment and commit to show baller feature
  #page.visit('/?todosMockData=more&filterMockData=show_active')
  #Percy::Capybara.snapshot(page, name: 'more + active')
end
