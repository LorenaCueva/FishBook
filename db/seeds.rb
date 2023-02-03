# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Fish.create!(name: "Striped Danio", care_level: "Easy", temperament: "Peaceful. Can be fin nipper.", lifespan: "2-5 years", size: 2, diet: "Flakes, freeze dried (bloodworms, daphnia, brine shrimp), and live foods.", water_type: "Freshwater")
Fish.create!(name: "Julii Cory Catfish", care_level: "Easy", temperament: "Peaceful", lifespan: "3-4 years", size: 2, diet: "Scavenger omnivore. Sinking pellets, thawed or live bloodworms", water_type: "Freshwater")
Fish.create!(name: "Panda Cory Catfish", care_level: "Easy", temperament: "Peaceful", lifespan: "3-4 years", size: 1.5, diet: "Scavenger omnivore. Sinking pellets, thawed or live bloodworms", water_type: "Freshwater")
Fish.create!(name: "Cherry Barb", care_level: "Easy", temperament: "Peaceful", lifespan: "4-6 years", size: 2, diet: "omnivore", water_type: "Freshwater")
