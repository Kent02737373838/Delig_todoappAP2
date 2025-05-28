let todos = [
    { id: 1, text: "PEE EXAM", completed: false },
    { id: 2, text: "FINAL PROJECT MAJOR", completed: false },
    { id: 3, text: "FILM PEE", completed: false },
    { id: 4, text: "VLOGGING TCW", completed: false },
    { id: 5, text: "GRIND GENSIN", completed: false },
    { id: 6, text: "COMPILE NOTES TCW", completed: false },
    { id: 7, text: "MAKE NEW FOODS", completed: false }
];
let nextId = 5;

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const todo = {
        id: nextId++,
        text: text,
        completed: false
    };

    todos.push(todo);
    todoInput.value = '';
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id 
            ? { ...todo, completed: !todo.completed }
            : todo
    );
    renderTodos();
}

function renderTodos() {
    if (todos.length === 0) {
        todoList.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        todoList.innerHTML = todos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `).join('');
    }

    updateStats();
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});
renderTodos();