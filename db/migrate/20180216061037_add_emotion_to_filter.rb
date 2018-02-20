class AddEmotionToFilter < ActiveRecord::Migration[5.1]
  def change
    remove_column :filters, :emotion, :string
    rename_column :filters, :image_uid, :anger_uid
    add_column :filters, :contempt_uid,  :string
    add_column :filters, :disgust_uid,  :string
    add_column :filters, :fear_uid,  :string
    add_column :filters, :happiness_uid,  :string
    add_column :filters, :neutral_uid,  :string
    add_column :filters, :sadness_uid,  :string
    add_column :filters, :surprise_uid,  :string
  end
end
