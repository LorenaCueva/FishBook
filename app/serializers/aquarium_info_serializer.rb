class AquariumInfoSerializer < ActiveModel::Serializer
  attributes :id, :fish, :fish_qty

  def fish
    self.object.fish
  end

  def fish_qty
    self.object.housings.sum(:qty)
  end

end
