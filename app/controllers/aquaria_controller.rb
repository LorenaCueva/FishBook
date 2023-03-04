class AquariaController < ApplicationController
    before_action :find_aquarium, only:[:destroy, :update]
    before_action :authorize, only:[:index, :show]
    before_action :auth, only: [:destroy, :update]

    
    def index
        aquariums = Aquarium.all.order(created_at: :desc)
        render json: aquariums, status: :ok
    end

     def show
        aquariums = Fish.find(params[:id]).aquaria.uniq
        render json: aquariums, status: :ok
    end

    def update
        @aquarium.update!(aquarium_params) 
        render json: @aquarium, status: :created
    end

    def destroy
        @aquarium.destroy
        head :no_content
    end

    def create
        user = User.find(session[:user_id])
        aquarium = user.aquaria.create!(aquarium_params)
        render json: aquarium, status: :created
    end

    private

    def aquarium_params
        params.permit(:image_url, :name, :galons, :comments, :filter, :heater, :water_type)
    end

    def find_aquarium
        @aquarium = Aquarium.find(params[:id])
    end

    def auth
        return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @aquarium.user_id == session[:user_id]
    end
end
