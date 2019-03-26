class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :set_todo, only: [:show]

  def index
    render json: Todo.all
  end

  def create
    todo = current_user.todos.build(todo_params)
    if todo.save
      render json: todo
    end
  end

  def show
    render json: @todo
  end

  private
    def set_todo
      @todo = Todo.find_by_id(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:title, :complete)
    end
end
