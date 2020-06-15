# frozen_string_literal: true

class UserCocktailsController < ApplicationController
  def create
    @usercocktail = UserCocktail.create(
      user_id: params[:user_id],
      cocktail_id: params[:cocktail_id]
    )
  end
end
