let tasks = [
    { id: 1, title: "PEE EXAM", description: "Prepare and take the PEE examination", status: "todo" },
    { id: 2, title: "FINAL PROJECT MAJOR", description: "Complete the major final project submission", status: "todo" },
    { id: 3, title: "FILM PEE", description: "Work on PEE film project", status: "todo" },
    { id: 4, title: "VLOGGING TCW", description: "Create and edit TCW vlogging content", status: "todo" }
];

let nextId = 99;

const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');

function addTask() {
    const title = newTaskInput.value.trim();
    if (title === '') return;

    const task = {
        id: nextId++,
        title: title,
        description: `Task: ${title}`,
        status: 'todo'
    };

    tasks.push(task);
    newTaskInput.value = '';
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function moveTask(id, newStatus) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
    );
    renderTasks();
}

function getNextStatus(currentStatus) {
    if (currentStatus === 'todo') return 'progress';
    if (currentStatus === 'progress') return 'done';
    return 'todo';
}

function getStatusLabel(status) {
    if (status === 'todo') return 'Start';
    if (status === 'progress') return 'Complete';
    return 'Reset';
}

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    const progressList = document.getElementById('progress-list');
    const doneList = document.getElementById('done-list');

    todoList.innerHTML = '';
    progressList.innerHTML = '';
    doneList.innerHTML = '';

    const todoTasks = tasks.filter(task => task.status === 'todo');
    const progressTasks = tasks.filter(task => task.status === 'progress');
    const doneTasks = tasks.filter(task => task.status === 'done');

    renderTasksInColumn(todoTasks, todoList);
    renderTasksInColumn(progressTasks, progressList);
    renderTasksInColumn(doneTasks, doneList);

    document.getElementById('todo-count').textContent = todoTasks.length;
    document.getElementById('progress-count').textContent = progressTasks.length;
    document.getElementById('done-count').textContent = doneTasks.length;

    showEmptyStateIfNeeded(todoList, 'No tasks yet');
    showEmptyStateIfNeeded(progressList, 'No tasks in progress');
    showEmptyStateIfNeeded(doneList, 'No completed tasks');
}

function renderTasksInColumn(taskList, container) {
    taskList.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.status}`;
        
        taskCard.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-description">${task.description}</div>
            <div class="task-actions">
                <button class="action-btn move-btn" onclick="moveTask(${task.id}, '${getNextStatus(task.status)}')">
                    ${getStatusLabel(task.status)}
                </button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;
        
        container.appendChild(taskCard);
    });
}

function showEmptyStateIfNeeded(container, message) {
    if (container.children.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = message;
        container.appendChild(emptyState);
    }
}

addTaskBtn.addEventListener('click', addTask);

newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();