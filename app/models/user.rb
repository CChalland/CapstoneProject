class User < ApplicationRecord
  has_secure_password
  validates :user_name, :email, presence: true
  validates :user_name, :email, uniqueness: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i

  has_many :filters
  has_many :faces
  has_many :visual_prowesses, through: :faces
  has_many :sharingans, through: :faces
  has_many :records, through: :faces


   def friendly_created_at
    created_at.strftime("%H:%M, %B %e, %Y")
  end

  def friendly_update_at
    updated_at.strftime("%H:%M, %B %e, %Y")
  end

  

  def as_json
    {
      id: id,
      user_name: user_name,
      email: email,
      password_digest: password_digest,
      full_name: full_name,
      birth_date: birth_date,
      gender: gender,
      membership: membership,
      admin: admin,
      created_at: friendly_created_at,
      updated_at: friendly_update_at
    }
  end

end
