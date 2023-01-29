class CreateAquaria < ActiveRecord::Migration[6.1]
  def change
    create_table :aquaria do |t|
      t.string :image_url
      t.string :comments
      t.string :type
      t.string :name
      t.string :size
      t.string :filter
      t.string :heater

      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
