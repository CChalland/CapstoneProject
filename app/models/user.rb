class User < ApplicationRecord
  has_secure_password
  validates :user_name, :email, presence: true

  has_many :faces
  has_many :visual_prowesses, through: :faces
  has_many :sharingans, through: :faces
  has_many :records, through: :faces

end
