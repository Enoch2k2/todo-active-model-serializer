Rails.application.routes.draw do
  root to: 'users#new'
  resources :todos
  get '/login', to: 'users#login', as: 'new_user_session'
  post '/login', to: 'users#new_session'
  delete '/logout', to: 'users#logout', as: 'destroy_user_session'
  resources :users
end
