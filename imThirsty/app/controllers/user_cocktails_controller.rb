# frozen_string_literal: true

class UserCocktailsController < ApplicationController
  def create
    @usercocktail = UserCocktail.create(
      user_id: params[:user_id],
      cocktail_id: params[:cocktail_id]
    )
    byebug
    redirect_to "http://localhost:3000/user.html?id=#{params[:user_id]}"
  end

  def destroy
    @usercocktail = UserCocktail.find(params[:id])
    @usercocktail.destroy
    redirect_to "http://localhost:3000/user.html?id=#{@usercocktail.user_id}"
  end
end
