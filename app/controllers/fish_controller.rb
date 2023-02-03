class FishController < ApplicationController
    def index
        fish = Fish.all.order(name: :asc)
        render json: fish, status: :ok
    end
end
