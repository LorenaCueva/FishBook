class CreateAquaria < ActiveRecord::Migration[6.1]
  def change
    create_table :aquaria do |t|
      t.integer :user_id
      t.string :image_url
      t.string :comments
      t.string :water_type
      t.string :name
      t.integer :galons
      t.string :filter
      t.string :heater

      t.timestamps
    end
  end
end
