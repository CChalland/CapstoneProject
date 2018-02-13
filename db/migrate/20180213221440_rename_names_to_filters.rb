class RenameNamesToFilters < ActiveRecord::Migration[5.1]
  def change
    rename_column :filters, :filter_emotion, :emotion
    rename_column :filters, :filter_category, :category
  end
end
