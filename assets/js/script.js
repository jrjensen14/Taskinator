var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var tasks = [];

var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;  
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("you need to fill out the task form!");
        return false;
    }
    
    // reset form fields for next task to be entered
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
    //console.log(isEdit);
    //has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //if no attribute, so create oject as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }

    //package up data as an object
    //var taskDataObj = {
        //name: taskNameInput,
        //type: taskTypeInput
    //};

    //send it as an argument to createTaskEl
    //createTaskEl(taskDataObj);
}

var completeEditTask = function(taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);
    // find task list item with taskId value
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            task[i].name = taskName;
            task[i].type = taskType;
        }
    };

    alert("Task Updated");

    saveTasks();

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};


var createTaskEl = function(taskDataObj) {
    // console.log(taskDataObj);
    // console.log(taskDataObj.status);
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");

    //create div to hold task info adn add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl); 

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    switch (taskDataObj.status) {
        case "to do":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.append(listItemEl);
            break;
        case "in progress":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.append(listItemEl);
            break;
        case "completed":
            taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.append(listItemEl);
            break;
        default:
            console.log("something went wrong!");
    }
    //save task as an objet with name,type, status, and id property then push it into tasks array
    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);
    // tasksToDoEl.appendChild(listItemEl);

    // //add entire list item to list
    // tasksToDoEl.appendChild(listItemEl);
    saveTasks();
   //increase task counter for next unique id
   taskIdCounter++; 
 };

 var createTaskActions = function(taskId) {
     // create container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);     
    // create change status dropdown
   var statusSelectEl = document.createElement("select");
   statusSelectEl.className = "select-status";
   statusSelectEl.setAttribute("name", "status-change");
   statusSelectEl.setAttribute("data-task-id", taskId);
   actionContainerEl.appendChild(statusSelectEl);
    // create status options
   var statusChoices = ["To Do", "In Progress", "Completed"];
  
   for (var i = 0; i < statusChoices.length; i++) {
       //create option element
       var statusOptionEl = document.createElement("option");
       statusOptionEl.textContent = statusChoices[i];
       statusOptionEl.setAttribute("value", statusChoices[i]);

       //append to select
       statusSelectEl.appendChild(statusOptionEl);

   }
   return actionContainerEl;
};
    //var listItemEl = document.createElement("li");
    //listItemEl.className = "task-item";
    //listItemEl.textContent = taskNameInput;



var taskButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;
    
    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        //console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //delete button was clikced
    else if (targetEl.matches(".delete-btn")) {
        //console.log("delete", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};
var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

     //get content from tast name and type
     var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //console.log(taskName);

     var taskType = taskSelected.querySelector("span.task-type").textContent;
     //console.log(taskType);

     // write values of taskName and taskType to form to be edited
     document.querySelector("input[name='task-name']").value = taskName;
     document.querySelector("select[name='task-type']").value = taskType;
     document.querySelector("#save-task").textContent = "Save Task";

     formEl.setAttribute("data-task-id", taskId);

};

var taskStatusChangeHandler = function(event) {
    //console.log(event.target.value);, event.target.getAttribute("data-task-id"))
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected options value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }   

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    console.log(tasks);

    saveTasks();
};
   
var deleteTask = function(taskId) {
    //console.log(taskId);
    // find task list element with taskId value and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if task[i].id doesnt match the value of taskId, lets keep that task and push it into the new array
        if (tasks[i].id != parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();

    alert("Task deleted1");
};

var dragTaskHandler = function(event) {
    //console.log("event.target:", event.target)
    //console.log("event.type", event.type);
    //console.log("event", event);
    if (event.target.matches("li.task-tiem")){
        var taskId = event.target.getAttribute("data-task-id");
        //console.log("Task ID:", taskId);
        //console.log("event", event);
        event.dataTransfer.setData("text/plain", taskId);
        // var getId = event.dataTransfer.getData("text/plain");
        //console.log("getId:", getId, typeof getId);
    } 
};

var dropZoneDragHandler = function(event) {
    //console.log("Dragover Event Target:", event.target);
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        //console.dir(taskListEl);
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
    //targetElement.closest(selector);

   // event.target.closest(".task-list")
};

var dropTaskHandler = function(event) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    //console.log(draggableElement);
    //console.dir(draggableElement);
    var dropZone = event.target.closest(".task-list");
    //console.log(statusType);
    //console.dir(dropZoneEl);
   
   //set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    var statusType = dropZone.id;
    //console.dir(statusSelectEl);
    //console.log(statusSelectEl);

    var newStatus;

    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < task.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    saveTasks();

    dropZoneEl.removeAttribute("style");

    dropZoneEl.appendChild(draggableElement);

};

var dragLeaveHandler = function(event) {
    //console.dir(event.target);
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("tasks saved")
}

var loadTask = function () {
    // get task items from localStorage
    var savedTasks = localStorage.getItem("tasks");
    // console.log("saved task found!")
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks) {
        // tasks = [];
        return false;
    }

    //parse into array of objects
    savedTasks = JSON.parse(savedTasks);
    // console.log(tasks)

    // loop throgh savedTask array
    for (var i = 0; i < tasks.length; i++) {
        // pass each task object into the `createTaskEl()` function
        createTaskEl(savedTasks[i]);
    }
}    
    // convert tasks from the string format back into an array of objects
    // iterates through a task array & creates task elements on the page from it
//      {
//         console.log(tasks[i]);
//         task[i] = taskIdCounter;
//             console.log(tasks[i]);
//         var listItemEl = document.createElement("li");
//         listItemEl.className = "task-item";
//         listItemEl.setAttribute("data-task-id", task[i].id);
//         listItemEl.setAttribute("draggable", ture);
//         console.log(listItemEl);
//     }
// }
// create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// for dragging 
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);

loadTask();

    //var listItemEl = document.createElement("li");
    //listItemEl.className = "task-item";
    //listItemEl.textContent = "this is a new task.";
    //tasksToDoEl.appendChild(listItemEl);


