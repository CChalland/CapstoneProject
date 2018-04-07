class ChangeVarribleType < ActiveRecord::Migration[5.1]
  def change
    rename_column :records, :image, :image_uid
    rename_column :records, :type, :image_name
  end
end
