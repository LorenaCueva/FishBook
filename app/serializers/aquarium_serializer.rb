class AquariumSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :comments, :galons, :filter, :heater, :water_type, :user_id, :by, :name, :fish_qty

  def by
   self.object.user.username
  end

  def fish_qty
    self.object.housings.sum(:qty)
  end
end
