Rails.application.routes.draw do
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  resources :users, only: [:create]


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  get "/me", to: "users#show"

  # get "/myAquariums", to: "my_aquaria#index"

  get "/aquariums", to: "aquaria#index"
  post "/aquariums", to: "aquaria#create"
  delete "/aquariums/:id", to: "aquaria#destroy"
  patch "/aquariums/:id", to: "aquaria#update"
  

end
