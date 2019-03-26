class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :todos
end

# {
#   id: 5,
#   username: "Bob",
#   todos: [
#     {
#       id: 1,
#       title: "walk the dog",
#       complete: true
#     }
#   ]
# }