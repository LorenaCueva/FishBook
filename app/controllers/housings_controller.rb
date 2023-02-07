class HousingsController < ApplicationController
    before_action :find_housing, only:[:destroy, :update]
    before_action :auth, only:[:update, :destroy]
    before_action :authorize, only:[:create]

    def destroy
        # return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @housing.aquarium.user_id == session[:user_id]
        @housing.destroy
        head :no_content
    end

    def update
        # return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @housing.aquarium.user_id == session[:user_id]
        @housing.update!(housing_params)
        render json: @housing, status: :created
    end

    def create
        return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless Aquarium.find(params[:id]).user_id == session[:user_id]
        housing = Housing.create!(housing_params)
        render json: housing, status: :created

    end

    private

    def find_housing
        @housing = Housing.find(params[:id])
    end

    def housing_params
        params.permit(:qty, :fish_id, :aquarium_id)
    end

    def auth
        return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @housing.aquarium.user_id == session[:user_id]
    end
end
