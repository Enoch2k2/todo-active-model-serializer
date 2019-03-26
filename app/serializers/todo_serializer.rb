class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :complete

  belongs_to :user
end
