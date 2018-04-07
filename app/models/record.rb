class Record < ApplicationRecord
  extend Dragonfly::Model
  dragonfly_accessor :image

  has_many :faces
  has_many :visual_prowesses, through: :faces
  has_many :sharingans, through: :faces
  has_many :users, through: :faces
  
end
