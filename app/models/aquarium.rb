class Aquarium < ApplicationRecord
    belongs_to :user
    validates :type, presence: true
    validates :size, presence: true
    validates :name, presence: true
    validates :type, inclusion {in ["Freshwater", "Saltwater"]}

end
