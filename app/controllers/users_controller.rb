class UsersController < ApplicationController
  before_action :redirect_if_logged_in, only: [:new, :login]
  before_action :set_user, only: [:show]

  def new
    @user = User.new
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      redirect_to user_path(user)
    else
      render :new
    end
  end

  def show
    redirect_if_not_logged_in
  end

  def login
    @user = User.new
  end

  def new_session
    user = User.find_by(username: params[:username])
    if user
      session[:user_id] = user.id
      redirect_to user_path(user)
    else
      render :login
    end
  end

  def logout
    session.clear
    redirect_to new_user_session_path
  end

  private
    def redirect_if_logged_in
      redirect_to user_path(current_user) if is_logged_in?
    end

    def redirect_if_not_logged_in
      redirect_to new_user_path if !is_logged_in?
    end

    def set_user
      @user = User.find_by_id(params[:id])
    end

    def user_params
      params.require(:user).permit(:username)
    end
end
