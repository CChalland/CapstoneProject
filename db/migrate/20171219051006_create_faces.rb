class CreateFaces < ActiveRecord::Migration[5.1]
  def change
    create_table :faces do |t|
      t.decimal :left_px
      t.decimal :top_px
      t.decimal :width_px
      t.decimal :height_px
      t.integer :visual_prowess_id
      t.integer :sharingan_id
      t.integer :user_id
      t.integer :record_id
      t.integer :session

      t.timestamps
    end
  end
end
