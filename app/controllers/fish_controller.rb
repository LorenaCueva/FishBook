class FishController < ApplicationController
    # before_action: :authorize

    def index
        fish = Fish.all.order(name: :asc)
        render json: fish, status: :ok
    end

    def show
        aquariums = Fish.find(params[:id]).aquaria.uniq
        render json: aquariums, status: :ok
    end
end
