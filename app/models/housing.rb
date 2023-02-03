class Housing < ApplicationRecord
    belongs_to :fish
    belongs_to :aquarium
    # validates :name, presence: true
    # validate :has_valid_date

    # def has_valid_date
    #     return true
    # end
end
