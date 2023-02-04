class HousingSerializer < ActiveModel::Serializer
  attributes :name, :fish, :id

  def fish
    self.object.fish
  end
end
