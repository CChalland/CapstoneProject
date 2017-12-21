class Face < ApplicationRecord
  
  belongs_to :visual_prowess, optional: true
  belongs_to :sharingan, optional: true
  belongs_to :user, optional: true
  belongs_to :record, optional: true
  
end
