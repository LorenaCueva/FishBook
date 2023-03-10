Rails.application.routes.draw do
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  resources :users, only: [:create]
  resources :fish, only: [:index, :create]
  resources :aquaria, only: [:index, :destroy, :update, :create]


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  get "/me", to: "users#show"

  get "/fish/:id/aquaria", to: "aquaria#show"

  get "/aquaria/:id/fish", to: "aquaria_fish#show"

  post "/aquaria/:id/housings", to: "housings#create"

  post "/likes/aquaria/:aquarium_id", to: "likes#create"
  delete "/likes/aquaria/:aquarium_id", to: "likes#destroy"

  delete "/housings/:id", to: "housings#destroy"
  patch "/housings/:id", to: "housings#update"


  

end
