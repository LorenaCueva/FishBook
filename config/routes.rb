Rails.application.routes.draw do
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  resources :users, only: [:create]
  resources :fish, only: [:index]


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  get "/me", to: "users#show"

  get "/aquariums", to: "aquaria#index"
  get "/aquariums/:id", to: "aquaria#show"
  post "/aquariums", to: "aquaria#create"
  delete "/aquariums/:id", to: "aquaria#destroy"
  patch "/aquariums/:id", to: "aquaria#update"
  

end
