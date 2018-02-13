class RenameFilterToFilters < ActiveRecord::Migration[5.1]
  def change
    rename_column :filters, :filter_uid, :image_uid
  end
end
