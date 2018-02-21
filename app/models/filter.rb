class Filter < ApplicationRecord
  dragonfly_accessor :anger
  dragonfly_accessor :contempt
  dragonfly_accessor :disgust
  dragonfly_accessor :fear
  dragonfly_accessor :happiness
  dragonfly_accessor :neutral
  dragonfly_accessor :sadness
  dragonfly_accessor :surprise

# # needs to be optional only when seeding the database
# belongs_to :user, optional: true
  belongs_to :user    


  # def as_json
  # end
end
