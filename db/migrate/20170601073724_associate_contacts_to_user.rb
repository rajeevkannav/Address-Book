class AssociateContactsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :contacts, :user_id, :integer, after: :id
    add_foreign_key :contacts, :users, on_delete: :cascade
  end
end
