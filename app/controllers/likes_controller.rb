class LikesController < ApplicationController
    before_action :find_user
    before_action :auth

    def create
        @user.likes.create!(like_params)
        head :no_content, status: :ok
    end

    def destroy
        @user.likes.find_by_aquarium_id(params[:aquarium_id]).destroy
        head :no_content, status: :ok
    end

    def like_params
        params.permit(:aquarium_id)
    end

    def find_user
        @user = User.find(session[:user_id])
    end

    def auth
        render json: {errors: ["Not Authorized"]} unless @user.id === session[:user_id]
    end
    
end
