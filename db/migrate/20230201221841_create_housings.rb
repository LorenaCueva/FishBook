class CreateHousings < ActiveRecord::Migration[6.1]
  def change
    create_table :housings do |t|
      t.date :date_added

      t.timestamps
    end
  end
end
