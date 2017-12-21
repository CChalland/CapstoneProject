class Sharingan < ApplicationRecord

  has_many :faces
  has_many :visual_prowesses, through: :faces
  has_many :users, through: :faces
  has_many :records, through: :faces
  
end
