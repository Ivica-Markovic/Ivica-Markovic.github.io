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
  addTodo: function(todoTask, lastPosition){
    this.todos.push({todo: todoTask, completed: false, position: lastPosition});
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
  deleteCompleted: function() {
    var newTodos = todoList.todos.filter(function(todos) {
      return todos.completed === false;
    })
    todoList.todos = newTodos;
    view.displayTodos();
  },
  deleteAllTodos: function () {
    alert("You are about to delete ALL your todos");
    this.todos = [];
    view.displayTodos();
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
  movePosition: function (position, direction) {
    var store = JSON.parse(localStorage.getItem("todos-local"));
    if (direction === "up" && parseInt(position) === 0) {
      var newTodos = store.map(function(item) {
        if (item.position === 0) {
          item.position = store.length -1;
          return item;
        }else {
          item.position -= 1;
          return item;
        }
      });
    }else if (direction === "up"){
      var newTodos = store.map(function(item) {
        if (item.position === (parseInt(position) -1)) {
          item.position += 1;
          return item;
        }else if (item.position === parseInt(position)) {
          item.position -= 1;
          return item;
        }else {
          return item;
        }
      });
    }else if (direction === "down" && parseInt(position) === store.length -1) {
      var newTodos = store.map(function(item) {
        if (item.position === store.length -1){
          item.position = 0;
          return item;
        }else {
          item.position += 1;
          return item;
        }
      });
    }else if (direction === "down") {
      var newTodos = store.map(function(item) {
        if (item.position === parseInt(position)) {
          item.position += 1;
          return item;
        }else if (item.position === parseInt(position) +1) {
          item.position -= 1;
          return item;
        }else {
          return item;
        }
      });
    }
    newTodos.sort(function (a, b) {
      return a.position - b.position;
    });
    this.todos = newTodos;
    view.displayTodos();
  },
  store: function(namespace, data) {
    if (arguments.length > 1 && namespace === 'todos-local') {
				return localStorage.setItem(namespace, JSON.stringify(data));
		}else if (arguments.length > 1 && namespace === 'notepadValue-local') {
        localStorage.setItem(namespace, data)
    }else if (arguments.length > 1 && namespace === 'rowHeight-local') {
        localStorage.setItem(namespace, data)
    }else if (namespace === 'todos-local') {
		    var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
    }else if (namespace === 'notepadValue-local') {
      var store = localStorage.getItem(namespace);
        return store;
    }else {
      var store = localStorage.getItem(namespace);
      return store;
    }
  }
}

var handler = {
  addTodo: function (event) {
    var userInput = document.getElementById('addTodoInput');
    var inputForm = document.getElementsByClassName('form-control todoInput');
    var lastPosition = inputForm.length
    console.log(lastPosition);
    if (event.keyCode === 13) {
      todoList.addTodo(userInput.value, lastPosition);
    }else if (event.type === 'click') {
      todoList.addTodo(userInput.value);
    }else {
      return;
    }
    userInput.value = ''
  },
  changeTodo: function (position, value) {
    var stripedPosition = position.slice(position.indexOf('-') + 1);
    todoList.changeTodo(stripedPosition, value);
  },
  toggleTodo: function(checkboxState, position) {
    var stripedPosition = position.slice(position.indexOf('-') + 1);
    if (checkboxState === true) {
      todoList.todos[stripedPosition].completed = true;
    }else if (checkboxState === false) {
      todoList.todos[stripedPosition].completed = false;
    }
    view.displayTodos();
  },
  toggleAllTodos: function () {
    todoList.toggleAllTodos();
  },
  deleteTodo: function (position) {
    var stripedPosition = position.slice(position.indexOf('-') + 1);
    todoList.deleteTodo(stripedPosition);
  },
  deleteCompleted: function () {
    todoList.deleteCompleted();
  },
  deleteAll: function() {
    todoList.deleteAllTodos();
  },
  movePosition: function (position, direction) {
    var stripedPosition = position.slice(position.indexOf('-') + 1);
    todoList.movePosition(stripedPosition, direction);
  },
  rowButtonSizeChange: function () {
    var notepad = document.getElementById('notepad');
    if (event.target.id === "rowIncrease") {
      notepad.rows += 1;
      todoList.store('rowHeight-local', notepad.rows)
    }else if (event.target.id === "rowDecrease") {
      notepad.rows -= 1;
      todoList.store('rowHeight-local', notepad.rows)
    }
  },
  updateNotepad: function () {
    todoList.store('notepadValue-local', notepad.value)
  }
}

var view = {
  displayTodos: function() {

    var listContainer = document.getElementById('addTodoInput');
    listContainer.innerHTML = '';
    var todoDiv = document.getElementById("list");
    todoDiv.innerHTML = "";
    //var notepadRowHeight = 15;

    todoList.todos.forEach(function (todo, position) {
      var inputGroup = document.createElement("div");
      var spanCheckbox = document.createElement("span");
      var spanUpDown = document.createElement("span");
      var divUp = document.createElement("div");
      var divDown = document.createElement("div");
      var upButton = this.createDeleteButton(position, "upButton");
      var downButton = this.createDeleteButton(position, "downButton");
      var inputCheckbox = document.createElement('input');
      var input = document.createElement('input');
      var spanButton = document.createElement("span");
      var deleteButton = this.createDeleteButton(position);


      //Set attributes for Bootstrap styling

      //div element for dynamic todolist inputs
      inputGroup.setAttribute("class", "input-group list");

      //checkbox and UpDown carets
      spanCheckbox.setAttribute("class", "input-group-addon");
      inputCheckbox.setAttribute("type", "checkbox");
      inputCheckbox.setAttribute("class", "checkbox")
      spanButton.setAttribute("class", "input-group-btn");
      spanUpDown.setAttribute("class", "input-group-btn moveTodo");
      inputCheckbox.setAttribute("id", 'inchec-' + position);

      //todolist display as an input field
      input.setAttribute("type", "text");
      input.setAttribute("value", todo.todo);
      input.setAttribute("id", 'in-' + position);

      //nesting Up Down DirectionButtons
      divUp.appendChild(upButton);
      divDown.appendChild(downButton);
      spanUpDown.appendChild(divUp);
      spanUpDown.appendChild(divDown);

      //nesting into todoDiv
      spanCheckbox.appendChild(inputCheckbox);
      spanButton.appendChild(deleteButton);
      inputGroup.appendChild(spanCheckbox);
      inputGroup.appendChild(spanUpDown);
      inputGroup.appendChild(input);
      inputGroup.appendChild(spanButton);
      todoDiv.appendChild(inputGroup);
      if (todo.completed === true) {
        inputCheckbox.checked = true;
        input.setAttribute("class", "form-control todoInput strikethrough")
      }else {
        inputCheckbox.checked = false;
          input.setAttribute("class", "form-control todoInput");
      }
    }, this);
    todoList.store('todos-local', todoList.todos);

    //Retrive Notepad storage
    var notepad = document.getElementById('notepad');
    notepad.value =   todoList.store('notepadValue-local');
  },
  createDeleteButton: function(position, name) {
    if (arguments.length > 1) {
      var directionButton = document.createElement('button');
      directionButton.id = name + '-' + position;
      directionButton.style = "font-size:10px"
      if ( name === "upButton") {
        directionButton.className = "btn-default btn-xs fa fa-caret-up pull-left";
        directionButton.name = "up";
      }else {
        directionButton.className = "btn-default btn-xs fa fa-caret-down pull-left";
        directionButton.name = "down";
      }
      return directionButton;
    }else {
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'delete';
      deleteButton.className = "btn btn-xs btn-round-xs btn-default deleteButton";
      deleteButton.id = 'del-' + position;
      return deleteButton;
    }
  }
}

var appInit = {
  init: function() {
    todoList.todos = todoList.store('todos-local');
    var notepad = document.getElementById('notepad');
    notepad.rows = todoList.store('rowHeight-local');
  },
  setEventListener: function() {
    var listOfTodo = document.getElementById('list');
    var todoInput = document.getElementsByClassName('todoInput')
    listOfTodo.addEventListener('click', function (event) {
      if (event.target.className === 'btn btn-xs btn-round-xs btn-default deleteButton') {
        handler.deleteTodo(event.target.id);
      }else if (event.target.type === 'checkbox') {
        var position = (event.target.id);
        var checkboxState = event.target.checked;
        handler.toggleTodo(checkboxState, position);
      }else if (event.target.className === "btn-default btn-xs fa fa-caret-up pull-left" ||
      event.target.className === "btn-default btn-xs fa fa-caret-down pull-left") {
        var position = (event.path[0].id);
        var direction = event.target.name;
        handler.movePosition(position, direction);
      }
    });
    listOfTodo.addEventListener('keyup', function () {
          if (event.keyCode === 13) {
            var position = (event.target.id);
            var stripedPosition = position.slice(position.indexOf('-') + 1);
            var value = (event.target.value);
            todoList.changeTodo(stripedPosition, value);
          }
      }, true);
    var addTodoInput = document.getElementById('addTodoInput');
    addTodoInput.addEventListener('keyup', function(event) {
      handler.addTodo(event);
    });
    var addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function(event) {
      handler.addTodo(event);
    });
    var notepad = document.getElementById('notepad');
    notepad.addEventListener('blur', function () {
      handler.updateNotepad();
    });
  }
}

appInit.init();
view.displayTodos();
appInit.setEventListener();
