class Filter < ApplicationRecord
  dragonfly_accessor :image

  belongs_to :user
end
