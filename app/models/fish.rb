class Fish < ApplicationRecord
    has_many :housings
    has_many :aquaria, through: :housings
    validates :name, presence: true
    validates :care_level, presence: true
    validates :care_level, inclusion: {in: ["Easy", "Moderate", "Hard"]}
    validates :temperament, presence: true
    # validates :image_url, presence: true
    validates :lifespan, presence: true
    validates :size, presence: true
    validates :size, numericality: true
    validates :diet, presence: true
end
