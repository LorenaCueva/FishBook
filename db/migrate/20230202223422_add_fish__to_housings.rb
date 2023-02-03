class AddFishToHousings < ActiveRecord::Migration[6.1]
  def change
    add_column :housings, :fish_id, :integer
    add_column :housings, :aquarium_id, :integer
    add_column :housings, :name, :string
    remove_column :housings, :date_added, :date
  end
end
