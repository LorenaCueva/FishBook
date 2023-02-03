class Aquarium < ApplicationRecord
    belongs_to :user
    # has_many :likes, :dependent => :destroy
    has_many :housings, :dependent => :destroy
    has_many :fish, through: :housings
    validates :water_type, presence: true
    validates :water_type, inclusion: {in: ["Saltwater", "Freshwater"]}
    validates :galons, presence: true
    validates :galons, numericality: { only_integer: true }
    validates :name, presence: true
end
