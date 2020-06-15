# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
UserCocktail.destroy_all
User.destroy_all

carlos = User.create(name: 'Carlos', username: 'carlos_the_awesome', password: 'password')
bryce = User.create(name: 'Bryce', username: 'brycius_maximus', password: 'password')

UserCocktail.create(user: bryce, cocktail_id: 16_134)
UserCocktail.create(user: bryce, cocktail_id: 11_113)
UserCocktail.create(user: carlos, cocktail_id: 13_200)
UserCocktail.create(user: carlos, cocktail_id: 12_718)
