require 'dragonfly'

# Configure
Dragonfly.app.configure do
  plugin :imagemagick

  secret "885b0f776de9fd582d7032673de88fc1b7dddb9f15aab21f0524ada222019b55"

  url_format "/media/:job/:name"

  datastore :file,
    root_path: Rails.root.join('lib/system/uchiha', Rails.env),
    server_root: Rails.root.join('lib')
end

# Logger
Dragonfly.logger = Rails.logger

# Mount as middleware
Rails.application.middleware.use Dragonfly::Middleware

# Add model functionality
if defined?(ActiveRecord::Base)
  ActiveRecord::Base.extend Dragonfly::Model
  ActiveRecord::Base.extend Dragonfly::Model::Validations
end
