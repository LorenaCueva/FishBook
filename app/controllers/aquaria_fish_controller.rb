class AquariaFishController < ApplicationController
    before_action :authorize

    def show
        aquarium = Aquarium.find(params[:id])
        render json: aquarium, serializer: AquariumFishSerializer, status: :ok
    end
end

