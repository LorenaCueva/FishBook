class Housing < ApplicationRecord
    belongs_to :fish
    belongs_to :aquarium
    validates :qty, presence: true
    validates :qty, numericality: { only_integer: true, greater_than: 0 }
end
