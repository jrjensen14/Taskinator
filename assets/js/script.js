var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;  
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("you need to fill out the task form!");
        return false;
    }
    
    formEl.reset();

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info adn add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
    listItemEl.appendChild(taskInfoEl); 

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";  

 }
    
    
    //var listItemEl = document.createElement("li");
    //listItemEl.className = "task-item";
    //listItemEl.textContent = taskNameInput;
    
   

formEl.addEventListener("submit", taskFormHandler); {
    //var listItemEl = document.createElement("li");
    //listItemEl.className = "task-item";
    //listItemEl.textContent = "this is a new task.";
    //tasksToDoEl.appendChild(listItemEl);
};