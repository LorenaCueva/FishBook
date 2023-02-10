class AquariumSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :comments, :galons, :filter, :heater, :water_type, :user_id, :by, :name, :fish_qty, :likes

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
