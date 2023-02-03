class CreateFish < ActiveRecord::Migration[6.1]
  def change
    create_table :fish do |t|
      t.string :name
      t.string :care_level
      t.string :temperament
      t.string :image_url
      t.string :lifespan
      t.float :size
      t.string :diet
      t.string :water_type

      t.timestamps
    end
  end
end
