class User < ApplicationRecord
    has_secure_password
    has_many :aquaria
    # has_many :likes
    validates :username, presence: true
    validates_uniqueness_of :username

end
