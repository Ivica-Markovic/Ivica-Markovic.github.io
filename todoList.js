/*
List of items to complete
-**setup local storage
-Enter over todo to edit **Need CSS
-Customise view with CSS Styles
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
    this.todos.splice(position, 1);
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
  },
  store: function(namespace, data) {
    if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
		} else {
		    var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
    }
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
  changeTodo: function (event) {

    if (event.key === 'Enter') {
      var position = parseInt(event.target.parentNode.id);
      var value = event.target.value;
      todoList.changeTodo(position, value);
      view.displayTodos();
    }
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
    var listContainer = document.getElementById('addTodoInput');
    listContainer.innerHTML = '';
    var todoDiv = document.getElementById("list");
    
    //Loop through to todos and check to see if todo is completed

    todoList.todos.forEach(function (todo, position) {
      //Create elements as foundations for todolist

      //var row = document.createElement("div");
      //var col = document.createElement("div");
      var inputGroup = document.createElement("div");
      var spanCheckbox = document.createElement("span");
      var inputCheckbox = document.createElement('input');
      var input = document.createElement('input');
      var spanButton = document.createElement("span");
      var deleteButton = this.createDeleteButton(position);

      //Set attributes for Bootstrap styling
      //Div Elements
      //row.setAttribute("class", "row");
      //col.setAttribute("class", "listInput");
      inputGroup.setAttribute("class", "input-group list");

      //checkbox
      spanCheckbox.setAttribute("class", "input-group-addon");
      inputCheckbox.setAttribute("type", "checkbox");
      spanButton.setAttribute("class", "input-group-btn");
      //todolist item as an input field
      input.setAttribute("type", "text");
      input.setAttribute("class", "form-control findPos")
      input.setAttribute("value", todo.todo);
      input.setAttribute("autoFocus", true);
      input.setAttribute("id", position);
      //nesting into todoDiv
      spanCheckbox.appendChild(inputCheckbox);
      spanButton.appendChild(deleteButton);
      inputGroup.appendChild(spanCheckbox);
      //divButton.appendChild(input);
      //todoRow.appendChild(deleteButton);
      inputGroup.appendChild(input);
      inputGroup.appendChild(spanButton);
      //col.appendChild(inputGroup);
      //inputGroup.appendChild(deleteButton);
      todoDiv.appendChild(inputGroup);
      if (todo.completed === true) {
        inputCheckbox.checked = true;
      }else {
        inputCheckbox.checked = false;
      }
    }, this);
    todoList.store('todos-local', todoList.todos);
  },
  createDeleteButton: function(position) {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.className = "btn btn-default deleteButton";
    deleteButton.id = position
    return deleteButton;
  }
}

var appInit = {
  init: function() {
    todoList.todos = todoList.store('todos-local');
  },
  setEventListener: function() {
    var todoList = document.getElementById('list');

    todoList.addEventListener('click', function (event) {
      if (event.target.className === 'deleteButton') {
        //var testEvent = event.path[2];
        console.log(event.target.id);
        //console.log(testEvent.id)
        //console.log(event.path[2]);
        debugger;
        handler.deleteTodo(parseInt(event.target.parentNode.id));
      }else if (event.target.className === 'edit') {
        handler.changeTodo(parseInt(event.target.parentNode.id));
      }else if (event.target.className === 'toggleButton') {
        handler.toggleTodo(parseInt(event.target.parentNode.id));
      }
    });
    var inputButton = document.getElementById('addTodoInput');
    inputButton.addEventListener('keyup', function(event) {
      handler.addTodo(event);
    });
    //listener to update input of todo list
    todoList.addEventListener('keyup', function(event) {
      if (event.target.id === 'edit') {
        handler.changeTodo(event);
      }
    });
  }
}

appInit.init();
view.displayTodos();
appInit.setEventListener();
