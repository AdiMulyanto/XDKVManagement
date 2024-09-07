let isAdmin = false;
let currentEditingTaskIndex = null;

// Fetch tasks from LocalStorage
function fetchTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Task title
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.title;

        li.appendChild(taskTitle);
        li.onclick = () => openTaskModal(index); // Open task modal on click

        taskList.appendChild(li);
    });
}

// Add new task to LocalStorage
function addTask() {
    const newTaskTitle = document.getElementById('newTaskTitle').value;
    const newTaskDesc = document.getElementById('newTaskDesc').value;
    const taskDate = new Date().toLocaleDateString();

    if (newTaskTitle && newTaskDesc) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({
            title: newTaskTitle,
            description: newTaskDesc,
            date: taskDate,
            status: 'Sedang Dikerjakan' // Default status
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('newTaskTitle').value = '';
        document.getElementById('newTaskDesc').value = '';
        fetchTasks();
    }
}

// Delete task from LocalStorage
function deleteTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(currentEditingTaskIndex, 1); // Remove the task at the current index
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Update LocalStorage
    fetchTasks(); // Refresh the task list
    closeModal(); // Close the modal
}

// Open Task Modal to view and edit details
function openTaskModal(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    document.getElementById('modalTaskTitle').textContent = task.title;
    document.getElementById('modalTaskDesc').textContent = task.description;
    document.getElementById('modalTaskDate').textContent = `Dibuat Pada: ${task.date}`;
    document.getElementById('modalTaskStatus').textContent = task.status;
    
    // For admin, show edit form
    if (isAdmin) {
        document.getElementById('modalAdminEdit').style.display = 'block';
        document.getElementById('editTaskDesc').value = task.description;
        document.getElementById('editTaskStatus').value = task.status;
        currentEditingTaskIndex = index;
    } else {
        document.getElementById('modalAdminEdit').style.display = 'none';
    }

    document.getElementById('taskModal').style.display = 'block';
}

// Close the modal
function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

// Save changes to task after editing
function saveTaskChanges() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedDesc = document.getElementById('editTaskDesc').value;
    const updatedStatus = document.getElementById('editTaskStatus').value;

    tasks[currentEditingTaskIndex].description = updatedDesc;
    tasks[currentEditingTaskIndex].status = updatedStatus;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    fetchTasks();
    closeModal();
}

// Admin login functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'adi' && password === 'adimulyanto321') {
        isAdmin = true;
        document.getElementById('adminPanel').style.display = 'block';
        document.getElementById('loginPanel').style.display = 'none';
        fetchTasks();
    } else {
        alert('SALAH BOSS!!');
    }
}

// Initial load
fetchTasks();
