# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    if params[:username]
      @user = User.where('username = ?', params[:username])
      if @user
        if @user.first.password == params[:password]
          redirect_to "http://localhost:3000/user.html?id=#{@user.first.id}"
        end
      end
    else
      redirect_to 'http://localhost:3000'
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user, include: :user_cocktails
  end

  def create
    @user = User.create(
      username: params[:username],
      name: params[:name],
      password: params[:password]
    )
    redirect_to "http://localhost:3000/user.html?id=#{@user.id}"
  end
end
