class Filter < ApplicationRecord
  dragonfly_accessor :filter

  belongs_to :user
end
