class AquariumFishSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :fish_qty, :likes, :water_type

  has_many :housings

  def by
   self.object.user.username
  end

  def fish_qty
    self.object.housings.sum(:qty)
  end

  def likes
    res = []
    self.object.likes.each do |l|
      res << l.user_id
    end
    res
  end
  
end
