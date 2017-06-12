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
  }
};

var view = {
  displayTodos: function(){
    todoList.todos.forEach(function (task){
      console.log(task.todo, " completed ", task.completed);
    });
  }
}
