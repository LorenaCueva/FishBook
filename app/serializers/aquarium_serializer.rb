class AquariumSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :comments, :galons, :filter, :heater, :water_type, :user_id, :by, :name

  def by
   self.object.user.username
  end
end
