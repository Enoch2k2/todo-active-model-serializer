// event listeners
function displayAll(todos) {
  resetMain();
  let ul = document.querySelector('#main ul')
  todos.forEach(todo => ulDisplay(todo))
}

function ulDisplay(todo) {
  let ul = document.querySelector('#main ul');
  ul.innerHTML += `<li><a href="#" data-id="${todo.id}" class="todo-link">${todo.title}</a> - ${todo.complete ? 'Completed' : 'Not Completed'}</li>`;
}

function display(todo) {
  let main = document.querySelector('#main')
  main.innerHTML = `
    <h3>Title: ${todo.title}</h3>
    <p>User: ${todo.user.username}</p>
    <p>Complete: ${todo.complete ? 'Complete' : 'Not Complete'}</p>
  `
}

function resetForm() {
  let form = document.querySelector('#todo-form')
  form.innerHTML = ''
}

function createTodoForm(e) {
  e.preventDefault();
  let form = document.querySelector('#todo-form')
  form.innerHTML = `
    <form id="form">
      <input type="text" id="title" placeholder="title"><br/>
      <label>Complete: </label><input type="checkbox" id="complete"><br/>
      <input type="submit" value="Create Todo">
    </form>
  `
  document.querySelector('form').addEventListener('submit', createTodo);
}

function createTodo(e) {
  e.preventDefault();
  let data = {
    todo: {
      title: document.getElementById('title').value,
      complete: document.getElementById('complete').checked
    }
  }

  fetch('http://localhost:3000/todos', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(resp => resp.json())
  .then(todo => {
    // do something with object
    ulDisplay(todo);
    let todos = document.getElementsByClassName('todo-link');
    todos[todos.length - 1].addEventListener('click', getTodo);
    resetForm();
  })
}

function getTodo(e) {
  e.preventDefault();
  let id = this.dataset.id;
  fetch(`http://localhost:3000/todos/${id}`)
  .then(resp => resp.json())
  .then(todo => {
    display(todo);
  })
}

function getTodos() {
  fetch('http://localhost:3000/todos')
  .then(resp => resp.json())
  .then(todos => {
    displayAll(todos);
    attachClickToLinks();
  })
}

function attachClickToTodoList(e) {
  e.preventDefault();
  getTodos();
}

function attachClickToLinks() {
  let links = document.getElementsByClassName('todo-link');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', getTodo);    
  }
}

function addSubmitToCreateTodoForm() {
  document.querySelector("a#create-todo-form").addEventListener('click', createTodoForm)
}

function addClickEventForListTodos() {
  document.getElementById('list-todos').addEventListener('click', attachClickToTodoList);
}

function resetMain(){
  let main = document.getElementById('main');
  main.innerHTML = '<h3>Todos</h3><hr><ul></ul>'
}

window.addEventListener('load', function(){
  // call all event listeners on page load
  addSubmitToCreateTodoForm();
  addClickEventForListTodos();
  getTodos();
  attachClickToLinks();
})
