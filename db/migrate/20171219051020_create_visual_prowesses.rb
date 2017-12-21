class CreateVisualProwesses < ActiveRecord::Migration[5.1]
  def change
    create_table :visual_prowesses do |t|
      t.decimal :anger
      t.decimal :contempt
      t.decimal :disgust
      t.decimal :fear
      t.decimal :happiness
      t.decimal :neutral
      t.decimal :sadness
      t.decimal :surprise

      t.timestamps
    end
  end
end
