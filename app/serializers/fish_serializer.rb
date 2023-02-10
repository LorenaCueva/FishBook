class FishSerializer < ActiveModel::Serializer
  attributes :fish, :total_aquariums

  def fish
    self.object
  end

  def total_aquariums
    self.object.aquaria.uniq.count
  end
end
