class MyAquariaController < ApplicationController
    def index
        aquariums = Aquarium.where("user_id = ?", session[:user_id])
        render json: aquariums[0]
    end
end
