class HousingsController < ApplicationController
    before_action :find_housing, only:[:destroy, :update]
    before_action :auth, only:[:update, :destroy]

    def destroy
        @housing.destroy
        render json: @housing, status: :ok
    end

    def update
        @housing.update!(update_params)
        render json: @housing, status: :created
    end

    def create
        aquarium = Aquarium.find(params[:id])
        return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless aquarium.user_id == session[:user_id]
        housing = aquarium.housings.find_by_fish_id(params[:fish_id])
        if housing
            total = housing.qty.to_i + params[:qty].to_i
            housing.update(qty: total)
            render json: housing, status: :created
        else
            new = Housing.create!(housing_params)
            render json: new, status: :created         
        end 
    end

    private

    def find_housing
        @housing = Housing.find(params[:id])
    end

    def housing_params
        params.permit(:qty, :fish_id, :aquarium_id)
    end

    def update_params
        params.permit(:qty)
    end

    def auth
        return render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @housing.aquarium.user_id == session[:user_id]
    end
end
