class FishController < ApplicationController
    before_action :authorize

    def index
        res = []
        fishes = Fish.all.map {|f| {name: f.name , count: f.aquaria.count}}.sort_by{|f|f[:count]}.reverse
        res = fishes.map{ |f| Fish.find_by_name(f[:name])}
        render json: res, status: :ok
    end

    def create
        fish = Fish.create!(fish_params)
        render json: fish, status: :created
    end

    private

    def fish_params
        params.permit(:name, :temperament, :image_url, :lifespan, :size, :diet, :water_type, :care_level)
    end

end
