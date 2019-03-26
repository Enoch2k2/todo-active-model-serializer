class ApplicationController < ActionController::Base
  helper_method :is_logged_in?, :current_user
  
  def is_logged_in?
    !!session[:user_id]
  end

  def current_user
    User.find_by_id(session[:user_id]) if is_logged_in?
  end
end
