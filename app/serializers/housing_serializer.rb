class HousingSerializer < ActiveModel::Serializer
  attributes :qty, :fish, :id

  belongs_to :aquarium

  def fish
    self.object.fish
  end

end
