class FishController < ApplicationController
    # before_action: :authorize

    def index
        res = []
        fishes = Fish.all.map {|f| {name: f.name , count: f.aquaria.count}}.sort_by{|f|f[:count]}.reverse
        res = fishes.map{ |f| Fish.find_by_name(f[:name])}
        render json: res, status: :ok
    end

    def show
        aquariums = Fish.find(params[:id]).aquaria.uniq
        render json: aquariums, status: :ok
    end

end
