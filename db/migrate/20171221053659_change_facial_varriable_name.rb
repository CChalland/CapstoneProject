class ChangeFacialVarriableName < ActiveRecord::Migration[5.1]
  def change
    rename_column :sharingans, :eft_42, :left_42
  end
end
