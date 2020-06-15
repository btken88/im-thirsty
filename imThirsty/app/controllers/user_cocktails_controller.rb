# frozen_string_literal: true

class UserCocktailsController < ApplicationController
  def create
    @usercocktail = UserCocktail.create(
      user_id: params[:user_id],
      cocktail_id: params[:cocktail_id]
    )
    redirect_to "http://localhost:3000/user.html?id=#{@usercocktail.user_id}"
  end
end
