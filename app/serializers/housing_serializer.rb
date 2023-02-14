class HousingSerializer < ActiveModel::Serializer
  attributes :qty, :fish, :id

  def fish
    self.object.fish
  end

end
