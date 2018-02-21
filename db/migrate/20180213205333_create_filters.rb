class CreateFilters < ActiveRecord::Migration[5.1]
  def change
    create_table :filters do |t|
      t.string :name
      t.string :anger_uid
      t.string :contempt_uid
      t.string :disgust_uid
      t.string :fear_uid
      t.string :happiness_uid
      t.string :neutral_uid
      t.string :sadness_uid
      t.string :surprise_uid
      t.integer :user_id
      t.boolean :public?

      t.timestamps
    end
  end
end
