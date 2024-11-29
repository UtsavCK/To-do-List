const myForm = document.querySelector('#myForm');
const taskInput = document.querySelector('#task');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const taskNumber = document.querySelector('#taskNumber');
const tasksHeader = document.querySelector('h2'); // "My Tasks" header

myForm.addEventListener('submit', onSubmit);
myForm.addEventListener('reset', onReset);

//Add an event listener for delete buttons
userList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskId = e.target.getAttribute('data-id');
        markTaskForDeletion(taskId);
    }
});

// a key which stores the index of last task entered
const lastKey=1000;

//initializing last key and storing it in 'number' variable
if(localStorage.getItem(lastKey)===null || isNaN(localStorage.getItem(lastKey))){
    localStorage.setItem(lastKey, 1);
}
var number=parseInt(localStorage.getItem(lastKey));

taskNumber.innerHTML = number;

//check if previous tasks are available in localStorage
if(number-1){
    //Show "My Tasks" if tasks exist
    tasksHeader.style.display = 'block';

    for(let i=1;i<number; i++){
        const li = createTaskElement(localStorage.getItem(i), i);
        userList.appendChild(li);
    }
    taskNumber.innerHTML = number;
}

// function to call when form is submitted
function onSubmit(e) {
    e.preventDefault();
    if (taskInput.value === '') {
        msg.innerHTML = 'Task cannot be empty.';
        setTimeout(() => msg.innerHTML = '', 1300);
    } else {
        localStorage.setItem(number, taskInput.value);
        localStorage.setItem(lastKey, number + 1);

        const li = createTaskElement(localStorage.getItem(number), number);
        userList.appendChild(li);

        // Show "My Tasks" header if it's not visible
        if (tasksHeader.style.display === 'none') {
            tasksHeader.style.display = 'block';
        }

        taskInput.value = '';
        number = number + 1;
        taskNumber.innerHTML = number;
    }
}

// function to call when user wishes to clear all tasks
function onReset(e) {
    e.preventDefault();
    let x = confirm('This will clear all existing tasks. Do you wish to proceed?');
    if (x) {
        for (let i = 1; i < number; i++) {
            userList.removeChild(userList.firstElementChild);
        }
        localStorage.clear();
        localStorage.setItem(lastKey, 1);
        number = 1;
        taskNumber.innerHTML = 1;
        taskInput.value = '';
        tasksHeader.style.display = 'none'; // Hide "My Tasks" when there are no tasks
    }
}

// Function to create a task item with a delete button
function createTaskElement(taskText, taskId) {
    const li = document.createElement('li');
    li.innerHTML = `${taskText} <button class="delete-btn" data-id="${taskId}">×</button>`;
    return li;
}

// Function to mark task for deletion with strikethrough
function markTaskForDeletion(taskId) {
    const taskElement = document.querySelector(`button[data-id="${taskId}"]`).parentElement;

    // Apply strikethrough and add transition class
    taskElement.classList.add('strikethrough');

    // Smoothly delete after delay to show strikethrough effect
    setTimeout(() => {
        deleteTask(taskId);
    }, 500); // Delay to show strikethrough effect before deleting
}

// Function to handle task deletion
function deleteTask(taskId) {
    // Remove task from localStorage
    localStorage.removeItem(taskId);

    // Remove task from the DOM
    const taskElement = document.querySelector(`button[data-id="${taskId}"]`).parentElement;
    userList.removeChild(taskElement);

    // If no tasks are left, hide the "My Tasks" header
    if (userList.children.length === 0) {
        tasksHeader.style.display = 'none';
    }

    // Shift tasks in localStorage to maintain consistency
    for (let i = parseInt(taskId) + 1; i < number; i++) {
        localStorage.setItem(i - 1, localStorage.getItem(i));
    }

    // Update the last key and number
    localStorage.removeItem(number - 1);
    number--;
    localStorage.setItem(lastKey, number);
    taskNumber.innerHTML = number;
}
