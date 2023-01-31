class Aquarium < ApplicationRecord
    belongs_to :user
    validates :water_type, presence: true
    validates :galons, presence: true
    validates :galons, numericality: { only_integer: true }
    validates :name, presence: true

end
