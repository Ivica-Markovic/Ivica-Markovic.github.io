var todoList = {
  todos: [{
    todo: 'Build App',
    completed: false
  },
  {
    todo: 'Test App',
    completed: false
  }

  ],
  addTodo: function(todoTask){
    todoList.todos.push({todo: todoTask, completed: false});
    view.displayTodos();
  },
  deleteTodo: function(position){
    this .todos.splice(position, 1);
    view.displayTodos();
  },
  changeTodo: function(position) {
    var newTodo = prompt();
    todoList.todos[position].todo = newTodo;
    view.displayTodos();
  },
  toggleTodo: function(position) {
    if (todoList.todos[position].completed === false) {
      todoList.todos[position].completed = true;
    }else {
      todoList.todos[position].completed = false;
    }
  },
  toggleAllTodos: function() {
    // loop through each of the objects in the todoList.todos array
    // and determine if all todos are completed
    var completedTodo = 0;

    this.todos.forEach(function (todo) {
        if (todo.completed === true) {
          completedTodo++;
        }
    });

    //loop through each of the objects in the todoList.todos arrays again
    //and set all to completed unless they all already are
    this.todos.forEach(function(todo, position) {
      if (this.todos.length === completedTodo) {
        todo.completed = false;
      }else {
        todo.completed = true;
      }
    }, this);
    view.displayTodos();
  }
};

var handler = {
  toggleAllTodos: function () {
    todoList.toggleAllTodos();
  },
  addTodo: function () {
    var addTodoInput = document.getElementById('addTodoInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = '';
  },
}

var view = {
  displayTodos: function() {
    //select the ul element and clear before going through
    //todo list
    var todoUi = document.querySelector('ul');
    todoUi.innerHTML = '';

    //Loop through to todos and check to see if todo is completed
    todoList.todos.forEach(function (todo) {
      var todoLi = document.createElement('li');
      var deleteButton = (this.createDeleteButton());

      if (todo.completed === true) {
        todoLi.textContent = ('(x) ' + todo.todo + ' ');
        todoLi.appendChild(deleteButton);
        todoUi.appendChild(todoLi);
      }else {
        todoLi.textContent = ('( ) ' + todo.todo + ' ');
        todoLi.appendChild(deleteButton);
        todoUi.appendChild(todoLi);
      }
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.id = 'deleteButton';
    return deleteButton;
  }
}
