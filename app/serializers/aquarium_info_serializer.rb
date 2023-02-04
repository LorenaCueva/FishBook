class AquariumInfoSerializer < ActiveModel::Serializer
  attributes :id, :fish

  def fish
    self.object.fish
  end

end
