const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items");

let todos = [];

// add an eventListener on form, and listen for submit event
todoForm.addEventListener("submit", (e) => {
  // prevent the page from reloading when submitting the form
  e.preventDefault();
  // call addTodo function with input box current value
  addTodo(todoInput.value);
});

// function to add todo
addTodo = (item) => {
  // if item is not empty
  if (item !== "") {
    // make a todo object, which has id, name, and completed properties
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    // then add it to todos array
    todos.push(todo);
    addToLocalStorage(todos); // then adding it to localStorage

    // finally clear the input box value
    todoInput.value = "";
  }
};

// function to render given todos to screen
renderTodos = (todos) => {
  // clear everything inside <ul> with class=todo-items
  todoItemsList.innerHTML = "";

  // run through each item inside todos
  todos.forEach((item) => {
    // check if the item is completed
    const checked = item.completed ? "checked" : null;

    // make a <li> element and fill it
    // <li> </li>
    const li = document.createElement("li");
    // <li class="item"> </li>
    li.setAttribute("class", "item");
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute("data-key", item.id);
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (item.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
  });
};

//addToLocalStorage() & getFromLocalStorage()

// function to add todos to local storage
addToLocalStorage = (todos) => {
  // convert the array to string then store it.
  localStorage.setItem("todos", JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
  console.log(todos, null, 2);
};


// make a function called getFromLocalStorage() below the previous code, then call it.


// function helps to get everything from local storage
getFromLocalStorage = () => {
  const reference = localStorage.getItem("todos");

  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
};

//toggle the value to completed & not completed
toggle = (id) => {
  todos.forEach((item) => {
    // we use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      //toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
};

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function (item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();

//toggle() & deleteTodo()

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener("click", (e) => {
  // check if the event is on checkbox
  if (e.target.type === "checkbox") {
    // toggle the state
    toggle(e.target.parentElement.getAttribute("data-key"));
  }
  // check if that is a delete-button
  if (e.target.classList.contains("delete-button")) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(e.target.parentElement.getAttribute("data-key"));
  }
});