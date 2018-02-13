class CreateFilters < ActiveRecord::Migration[5.1]
  def change
    create_table :filters do |t|
      t.string :filter_uid
      t.string :filter_emotion
      t.string :filter_category
      t.integer :user_id
      t.boolean :public

      t.timestamps
    end
  end
end
