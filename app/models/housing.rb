class Housing < ApplicationRecord
    belongs_to :fish
    belongs_to :aquarium
    validates :qty, presence: true
    validates :qty, numericality: { only_integer: true, greater_than: 0 }
    validate :same_water_type

    private

    def same_water_type
        if self.fish.water_type != self.aquarium.water_type
            errors.add(:fish, "and aquarium must be of the same water-type")
        end
    end
end
