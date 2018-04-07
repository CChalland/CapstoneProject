class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :email
      t.string :password_digest
      t.string :full_name
      t.string :birth_date
      t.string :gender
      t.boolean :membership
      t.boolean :admin

      t.timestamps
    end
  end
end
