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
  deleteCompleted: function() {
    var newTodos = todoList.todos.filter(function(todos) {
      return todos.completed === false;
    })
    todoList.todos = newTodos;
    view.displayTodos();
  },
  deleteAllTodos: function () {
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
    if (event.keyCode === 13) {
      todoList.addTodo(userInput.value);
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
    var notepadRowHeight = 15;

    todoList.todos.forEach(function (todo, position) {
      var inputGroup = document.createElement("div");
      var spanCheckbox = document.createElement("span");
      var inputCheckbox = document.createElement('input');
      var input = document.createElement('input');
      var spanButton = document.createElement("span");
      var deleteButton = this.createDeleteButton(position);

      //Set attributes for Bootstrap styling

      //div element for dynamic todolist inputs
      inputGroup.setAttribute("class", "input-group list");

      //checkbox
      spanCheckbox.setAttribute("class", "input-group-addon");
      inputCheckbox.setAttribute("type", "checkbox");
      inputCheckbox.setAttribute("class", "checkbox")
      spanButton.setAttribute("class", "input-group-btn");
      inputCheckbox.setAttribute("id", 'inchec-' + position);
      //todolist display as an input field
      input.setAttribute("type", "text");
      input.setAttribute("value", todo.todo);
      input.setAttribute("id", 'in-' + position);

      //nesting into todoDiv
      spanCheckbox.appendChild(inputCheckbox);
      spanButton.appendChild(deleteButton);
      inputGroup.appendChild(spanCheckbox);
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
  createDeleteButton: function(position) {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.className = "btn btn-xs btn-round-xs btn-default deleteButton";
    deleteButton.id = 'del-' + position;
    return deleteButton;
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

fetch("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", {
		method: 'GET',
		mode: 'cors'
	}).then(function (response) {
		if (response.status !== 200) {
			console.log('Status Code: ' + response.status);
			return;
		}
		response.json().then(function(data) {
			var notepad = document.getElementById('notepad');
			var text = data['0'].content
			console.log(notepad.value);
			notepad.value = text;
			console.log(text);
		});
}).catch(function(err) {
	console.log(err);
});

