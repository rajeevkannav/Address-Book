class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :address
      t.string :organization
      t.date :birthday
      t.boolean :important_contact, default: false

      t.timestamps
    end
  end
end
