class VisualProwess < ApplicationRecord

  has_many :faces
  has_many :sharingans, through: :faces
  has_many :users, through: :faces
  has_many :records, through: :faces
  
end
