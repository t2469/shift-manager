Rails.application.routes.draw do
  post '/login/administrator', to: 'sessions#admin_login'
  post 'login/employee', to: 'sessions#employee_login'

  resources :administrators, only: [:create]
end
