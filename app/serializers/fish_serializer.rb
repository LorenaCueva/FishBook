class FishSerializer < ActiveModel::Serializer
  attributes :fish

  def fish
    self.object
  end
end
