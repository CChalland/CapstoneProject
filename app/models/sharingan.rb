class Sharingan < ApplicationRecord

  belongs_to :user
  has_many :faces
  has_many :visual_prowesses, through: :faces
  has_many :records, through: :faces


   def friendly_created_at
    created_at.strftime("%H:%M, %B %e, %Y")
  end

  def friendly_update_at
    updated_at.strftime("%H:%M, %B %e, %Y")
  end

  # def as_json
  #   {
  #     id: id,
  #     right_0: right_0,
  #     right_1: right_1,
  #     right_2: right_2,
  #     right_3: right_3,
  #     right_4: right_4,
  #     right_5: right_5,
  #     right_6: right_6,
  #     right_7: right_7,
  #     middle_8: middle_8,
  #     left_9: left_9,
  #     left_10: left_10,
  #     left_11: left_11,
  #     left_12: left_12,
  #     left_13: left_13,
  #     left_14: left_14,
  #     left_15: left_15,
  #     left_16: left_16,
  #     right_17: right_17,
  #     right_18: right_18,
  #     right_19: right_19,
  #     right_20: right_20,
  #     right_21: right_21,
  #     left_22: left_22,
  #     left_23: left_23,
  #     left_24: left_24,
  #     left_25: left_25,
  #     left_26: left_26,
  #     middle_27: middle_27,
  #     middle_28: middle_28,
  #     middle_29: middle_29,
  #     middle_30: middle_30,
  #     middle_31: middle_31,
  #     middle_32: middle_32,
  #     middle_33: middle_33,
  #     middle_34: middle_34,
  #     middle_35: middle_35,
  #     right_36: right_36,
  #     right_37: right_37,
  #     right_38: right_38,
  #     right_39: right_39,
  #     right_40: right_40,
  #     right_41: right_41,
  #     left_42: left_42,
  #     left_43: left_43,
  #     left_44: left_44,
  #     left_45: left_45,
  #     left_46: left_46,
  #     left_47: left_47,
  #     middle_48: middle_48,
  #     middle_49: middle_49,
  #     middle_50: middle_50,
  #     middle_51: middle_51,
  #     middle_52: middle_52,
  #     middle_53: middle_53,
  #     middle_54: middle_54,
  #     middle_55: middle_55,
  #     middle_56: middle_56,
  #     middle_57: middle_57,
  #     middle_58: middle_58,
  #     middle_59: middle_59,
  #     middle_60: middle_60,
  #     middle_61: middle_61,
  #     middle_62: middle_62,
  #     middle_63: middle_63,
  #     middle_64: middle_64,
  #     middle_65: middle_65,
  #     middle_66: middle_66,
  #     middle_67: middle_67,
  #     created_at: friendly_created_at,
  #     updated_at: friendly_update_at
  #   }
  # end
end
