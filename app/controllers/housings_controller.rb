class HousingsController < ApplicationController
    before_action :find_housing, only:[:destroy, :update]
    before_action :authorize, only:[:create]

    def destroy
        return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @housing.aquarium.user_id == session[:user_id]
        @housing.destroy
        head :no_content
    end

    def update
        return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @housing.aquarium.user_id == session[:user_id]
        @housing.update!(housing_params)
        render json: @housing, status: :created
    end

    def create
        housing = Housing.create!(params.permit)
    end

    private

    def find_housing
        @housing = Housing.find(params[:id])
    end

    def housing_params
        params.permit(:name, :aquarium_id, :fish_id)
    end
end
