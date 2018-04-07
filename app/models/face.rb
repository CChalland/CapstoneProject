class Face < ApplicationRecord
  
  belongs_to :visual_prowess
  belongs_to :sharingan, optional: true
  belongs_to :user, optional: true
  belongs_to :record

  # def as_json
  #   {
  #     id: id,
  #     left_px: left_px,
  #     top_px: top_px,
  #     width_px: width_px,
  #     height_px: height_px,
  #     visual_prowess_id: visual_prowess_id,
  #     sharingan_id: sharingan_id,
  #     user_id: user.id,
  #     record_id: record_id,
  #     session: session,
  #     created_at: created_at,
  #     updated_at: updated_at
  #   }
  # end
  
end
