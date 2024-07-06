const myForm = document.querySelector('#myForm');
const taskInput = document.querySelector('#task');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const taskNumber = document.querySelector('#taskNumber');

myForm.addEventListener('submit', onSubmit);
myForm.addEventListener('reset', onReset);

//a key which stores the index of last task entered
const lastKey=1000;

//initializing last key and storing it in 'number' variable
if(localStorage.getItem(lastKey) === null || isNaN(localStorage.getItem(lastKey)))
{
    localStorage.setItem(lastKey,1);
}
var number=parseInt(localStorage.getItem(lastKey));

taskNumber.innerHTML = number;

//check if previous tasks are available in localStorage
if(number-1){
    for(let i=1;i<number; i++){
        const li = document.createElement('li');
        li.innerHTML = localStorage.getItem(i);
        userList.appendChild(li);
    }
    taskNumber.innerHTML = number;
}

//function to call when form is submitted
function onSubmit(e){
    e.preventDefault();
    if(taskInput.value===''){
        msg.innerHTML='Task cannot be empty.';
        setTimeout(() => msg.innerHTML = '', 1300);
    }
    else{
        localStorage.setItem(number,taskInput.value);
        localStorage.setItem(lastKey, number+1)

        const li = document.createElement('li');
        li.innerHTML = localStorage.getItem(number);
        userList.appendChild(li);

        taskInput.value = '';
        number = number + 1;
        taskNumber.innerHTML = number;
    }
}

//function to call when user wishes to clear all tasks
function onReset(e){
    e.preventDefault();
    let x = confirm('This will clear all existing taks. Do you wish to proceed?');
    if(x){
        for(let i=1;i<number;i++){
            userList.removeChild(userList.firstElementChild);
        }
        localStorage.clear();
        localStorage.setItem(lastKey,1);
        number=1;
        taskNumber.innerHTML = 1;
        taskInput.value = '';
    }
}
