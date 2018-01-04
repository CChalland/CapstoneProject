class VisualProwess < ApplicationRecord

  # belongs_to :user
  has_many :faces
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
      anger: (anger * 100).round(4),
      contempt: (contempt * 100).round(4),
      disgust: (disgust * 100).round(4),
      fear: (fear * 100).round(4),
      happiness: (happiness * 100).round(4),
      neutral: (neutral * 100).round(4),
      sadness: (sadness * 100).round(4),
      surprise: (surprise * 100).round(4),
      created_at: friendly_created_at,
      updated_at: friendly_update_at
    }
  end
end
