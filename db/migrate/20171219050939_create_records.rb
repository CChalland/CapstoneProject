class CreateRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :records do |t|
      t.string :type
      t.string :image

      t.timestamps
    end
  end
end
