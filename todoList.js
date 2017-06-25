/*
List of items to complete
-Enter over todo to edit
-setup local storage
-Customise view
-insert director for routing hyperlinks
-Add Twitter Feed into surronding white space

*/

var todoList = {
  todos: [],
  addTodo: function(todoTask){
    todoList.todos.push({todo: todoTask, completed: false});
    view.displayTodos();
  },
  deleteTodo: function(position){
    this .todos.splice(position, 1);
    view.displayTodos();
  },
  changeTodo: function(position, value) {
    todoList.todos[position].todo = value;
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
    var userInput = document.getElementById('addTodoInput')

    if (event.code === 'Enter') {
      todoList.addTodo(userInput.value);
    }else {
      return;
    }
    userInput.value = ''
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  changeTodo: function (position, value) {
    todoList.changeTodo(position, value);
    view.displayTodos();
  },
  toggleTodo: function(position) {
    todoList.toggleTodo(position);
    view.displayTodos();
  }
}

var view = {
  displayTodos: function() {
    //select the ul element and clear before going through
    //todo list
    var todoUi = document.querySelector('ul');
    todoUi.innerHTML = '';

    //Loop through to todos and check to see if todo is completed
    todoList.todos.forEach(function (todo, position) {
      var todoLi = document.createElement('li');
      var deleteButton = (this.createDeleteButton());
      var changeButton = (this.createChangeButton());
      var toggleButton = (this.createToggleButton());

      if (todo.completed === true) {
        todoLi.textContent = ('(x) ' + todo.todo + ' ');
      }else {
        todoLi.textContent = ('( ) ' + todo.todo + ' ');
      }

      todoLi.appendChild(deleteButton);
      todoLi.appendChild(changeButton);
      todoLi.appendChild(toggleButton);
      todoLi.id = position;
      todoUi.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createChangeButton: function() {
    var changeButton = document.createElement('button');
    changeButton.textContent = 'Update';
    changeButton.className = 'changeButton';
    return changeButton;
  },
  createToggleButton: function() {
    var toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle';
    toggleButton.className = 'toggleButton';
    return toggleButton;
  },
  setEventListener: function() {
    var todoUl = document.querySelector('ul');

    todoUl.addEventListener('click', function (event) {
      if (event.target.className === 'deleteButton') {
        handler.deleteTodo(parseInt(event.target.parentNode.id));
      }else if (event.target.className === 'changeButton') {
        handler.changeTodo(parseInt(event.target.parentNode.id));
      }else if (event.target.className === 'toggleButton') {
        handler.toggleTodo(parseInt(event.target.parentNode.id));
      }else {
        $(function() {
          //var input = event.target.closest('li');
          //console.log(input.value);
          //input.value.focus();
          var $input = $(event.target).closest('li').addClass('editing').find('.edit');
          $input.val($input.val()).focus();
          console.log($input);
          //handler.changeTodo(parseInt(input.id));
        });

      }
    });
    var inputButton = document.getElementById('addTodoInput');
    inputButton.addEventListener('keyup', function(event) {
      handler.addTodo(event);
    });
  }
}
view.setEventListener();

$(function() {
  $('p').click(function(){
    console.log('clicked the pargraph with JQuery');

  });
});
