const todoForm = document.querySelector('.todo-form')
const todoItemsList = document.querySelector('.todo-list')
const themeBtn = document.querySelector('.nav img')
const body = document.querySelector('body')
const btnAll = document.querySelector('.btn-all')
const btnActive = document.querySelector('.btn-active')
const btnCompleted = document.querySelector('.btn-completed')
const filterBtns = [btnAll, btnActive, btnCompleted]
const btnClearCompleted = document.querySelector('.btn-clear-completed')

let todos = []

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', (e) => {
  // prevent the page from reloading when submitting the form
  e.preventDefault()
  // call addTodo function with input box current value
  addTodo(todoForm.newTodo.value)
  // finally clear the input box value
  todoForm.newTodo.value = ''
})

// function to add todo
addTodo = (item) => {
  // if item is not empty
  if (item !== '') {
    // make a todo object, which has id, name, and completed properties
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    }

    // then add it to todos array
    todos.push(todo)
    addToLocalStorage(todos) // then adding it to localStorage
  }
}

// function to render given todos to screen
renderTodos = (todos) => {
  // clear everything inside <ul> with class=todo-items
  todoItemsList.innerHTML = ''

  // run through each item inside todos
  todos.forEach((item) => {
    // check if the item is completed
    const checked = item.completed ? 'checked' : null

    // make a <li> element and fill it
    // <li> </li>
    const li = document.createElement('li')
    // <li class="item"> </li>
    li.setAttribute('class', 'list-item')
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (checked) {
      li.classList.add('checked')
    }

    li.innerHTML = `
      <input
        type="checkbox"
        id=item.id
        class="checkbox"
        onClick="toggle(${item.id})"
        ${checked}>
      <label for="${item.id}">${item.name}</label>
      <button class="delete-button"  onClick='deleteTodo(${item.id})'><strong>❌ </strong></button>
    `
    // finally add the <li> to the <ul>
    todoItemsList.append(li)
  })
}

//addToLocalStorage() & getFromLocalStorage()

// function to add todos to local storage
addToLocalStorage = (todos) => {
  // convert the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos))
  // render them to screen
  renderTodos(todos)
}

// make a function called getFromLocalStorage() below the previous code, then call it.

// function helps to get everything from local storage
getFromLocalStorage = () => {
  const reference = localStorage.getItem('todos')

  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference)
    renderTodos(todos)
  }
}

//toggle the value to completed & not completed
toggle = (id) => {
  todos.forEach((item) => {
    // we use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      //toggle the value
      item.completed = !item.completed
    }
  })

  addToLocalStorage(todos)
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function (item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id
  })
  // update the localStorage
  addToLocalStorage(todos)
}

// function to change theme
changeTheme = () => {
  const currTheme = body.classList[0]
  body.classList.remove(currTheme)
  if (currTheme === 'light-theme') {
    body.classList.add('dark-theme')
    themeBtn.src = './images/icon-sun.svg'
  } else {
    body.classList.add('light-theme')
    themeBtn.src = './images/icon-moon.svg'
  }
}

// event listener on theme-btn
themeBtn.addEventListener('click', changeTheme)

// function to filter todos
function filterTodos(filterFunc) {
  let filteredTodos = todos.filter(filterFunc)
  renderTodos(filteredTodos)
}

// event listeners on filter buttons
btnAll.addEventListener('click', () => {
  filterTodos(function (item) {
    return true
  })
  removeActiveClassforAll()
  btnAll.classList.add('active')
})

btnActive.addEventListener('click', () => {
  filterTodos(function (item) {
    return !item.completed
  })
  removeActiveClassforAll()
  btnActive.classList.add('active')
})

btnCompleted.addEventListener('click', () => {
  filterTodos(function (item) {
    return item.completed
  })
  removeActiveClassforAll()
  btnCompleted.classList.add('active')
})

// function to remove active class on filter buttons
function removeActiveClassforAll() {
  filterBtns.forEach((btn) => {
    btn.classList.remove('active')
  })
}

// initially get everything from localStorage
getFromLocalStorage()
