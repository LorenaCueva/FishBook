class AddQtyToHousings < ActiveRecord::Migration[6.1]
  def change
    add_column :housings, :qty, :integer
    remove_column :housings, :name, :string
  end
end
