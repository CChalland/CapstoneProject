# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180213205333) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "faces", force: :cascade do |t|
    t.decimal "left_px"
    t.decimal "top_px"
    t.decimal "width_px"
    t.decimal "height_px"
    t.integer "visual_prowess_id"
    t.integer "sharingan_id"
    t.integer "user_id"
    t.integer "record_id"
    t.integer "session"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "filters", force: :cascade do |t|
    t.string "filter_uid"
    t.string "filter_emotion"
    t.string "filter_category"
    t.integer "user_id"
    t.boolean "public"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "records", force: :cascade do |t|
    t.string "image_name"
    t.string "image_uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sharingans", force: :cascade do |t|
    t.string "right_0"
    t.string "right_1"
    t.string "right_2"
    t.string "right_3"
    t.string "right_4"
    t.string "right_5"
    t.string "right_6"
    t.string "right_7"
    t.string "middle_8"
    t.string "left_9"
    t.string "left_10"
    t.string "left_11"
    t.string "left_12"
    t.string "left_13"
    t.string "left_14"
    t.string "left_15"
    t.string "left_16"
    t.string "right_17"
    t.string "right_18"
    t.string "right_19"
    t.string "right_20"
    t.string "right_21"
    t.string "left_22"
    t.string "left_23"
    t.string "left_24"
    t.string "left_25"
    t.string "left_26"
    t.string "middle_27"
    t.string "middle_28"
    t.string "middle_29"
    t.string "middle_30"
    t.string "middle_31"
    t.string "middle_32"
    t.string "middle_33"
    t.string "middle_34"
    t.string "middle_35"
    t.string "right_36"
    t.string "right_37"
    t.string "right_38"
    t.string "right_39"
    t.string "right_40"
    t.string "right_41"
    t.string "left_42"
    t.string "left_43"
    t.string "left_44"
    t.string "left_45"
    t.string "left_46"
    t.string "left_47"
    t.string "middle_48"
    t.string "middle_49"
    t.string "middle_50"
    t.string "middle_51"
    t.string "middle_52"
    t.string "middle_53"
    t.string "middle_54"
    t.string "middle_55"
    t.string "middle_56"
    t.string "middle_57"
    t.string "middle_58"
    t.string "middle_59"
    t.string "middle_60"
    t.string "middle_61"
    t.string "middle_62"
    t.string "middle_63"
    t.string "middle_64"
    t.string "middle_65"
    t.string "middle_66"
    t.string "middle_67"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name"
    t.string "email"
    t.string "password_digest"
    t.string "full_name"
    t.string "birth_date"
    t.string "gender"
    t.boolean "membership"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "visual_prowesses", force: :cascade do |t|
    t.decimal "anger"
    t.decimal "contempt"
    t.decimal "disgust"
    t.decimal "fear"
    t.decimal "happiness"
    t.decimal "neutral"
    t.decimal "sadness"
    t.decimal "surprise"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
