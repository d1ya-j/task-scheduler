const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let tt=0;
let ct=0;
let k=0;
updateProgressBar();

function addTask() {
    event.preventDefault();
    const task = taskInput.value;
    const priority = priorityInput.value;

    if(task=="")
    {
        alert("Enter a valid task");
    }
    else
    {
        tt++;
        updateProgressBar();
        const newTask = document.createElement("div");
        const mainPart = document.createElement("div");
        const secondPart = document.createElement("div");
        const thirdPart = document.createElement("div");
        mainPart.classList.add("main-part");
        secondPart.classList.add("second-part");
        thirdPart.classList.add("task-item");
        newTask.classList.add("entire-task");

        const name = document.createElement("h3");
        name.textContent = task;

        const dltButton = document.createElement("button");
        const markDone = document.createElement("button");
        markDone.classList.add("mark-done");
        dltButton.classList.add("deleteButton");
        markDone.textContent="Complete";
        markDone.addEventListener("click", function() 
        {
            moveTaskToCompleted(newTask);
        });

        if(deadlineInput.value)
        {
            const taskDeadline = document.createElement("p");
            taskDeadline.classList.add("deadlineAlign");
            const dateArray = deadlineInput.value.split("-");
            const month = parseInt(dateArray[1], 10); 
            const date = dateArray[2];
            const deadline = date + " " + monthNames[month - 1]; 
            taskDeadline.textContent = deadline;
            mainPart.appendChild(taskDeadline);
        }

        dltButton.textContent="Delete";
        dltButton.addEventListener("click", function() 
        {
            deleteTask(newTask); 
        });

        mainPart.appendChild(name);
        secondPart.appendChild(markDone);
        secondPart.appendChild(dltButton);
        thirdPart.appendChild(mainPart);
        thirdPart.appendChild(secondPart);
        newTask.appendChild(thirdPart);

        markDone.classList.add("buttonstyle");
        dltButton.classList.add("buttonstyle");

        let priorityClass;
        switch (priority) 
        {
            case "Top priority":
                priorityClass = "top-priority";
                break;
            case "Medium priority":
                priorityClass = "medium-priority";
                break;
            case "Low priority":
                priorityClass = "low-priority";
                break;
            default:
                priorityClass = "";
        }
        thirdPart.classList.add(priorityClass);
        document.getElementById("taskList").appendChild(newTask);
    }
}

function deleteTask(taskElement) {
    const completedTasks = document.getElementById("completedTasks");

    const isTask = taskElement.parentElement === taskList;
    const isCompletedTask = taskElement.parentElement === completedTasks;


    taskElement.remove();
    if (isTask) {
        tt--;
    }
    if (isCompletedTask) {
        tt--;
        ct--;
    }
    updateProgressBar();
}

function moveTaskToCompleted(taskElement) {
    ct++;
    updateProgressBar();
    const completedTasks = document.getElementById("completedTasks");
    const markDoneButton = taskElement.querySelector(".mark-done");

    if (markDoneButton) { 
        markDoneButton.textContent = "Undo";
        markDoneButton.removeEventListener("click", markTaskAsCompleted);
        markDoneButton.addEventListener("click", undoCompletedTask);
    }
    completedTasks.appendChild(taskElement);
}

function markTaskAsCompleted() {
    const taskElement = this.parentElement.parentElement;
    moveTaskToCompleted(taskElement);
}

function undoCompletedTask() {
    const taskElement = this.parentElement.parentElement;
    const markDoneButton = taskElement.querySelector(".mark-done");
    const deleteButton = taskElement.querySelector(".deleteButton");

    markDoneButton.textContent = "Complete";

    markDoneButton.removeEventListener("click", undoCompletedTask);
    markDoneButton.addEventListener("click", markTaskAsCompleted);

    deleteButton.addEventListener("click", function() {
        deleteTask(taskElement);
    });

    const taskList = document.getElementById("taskList");
    taskList.appendChild(taskElement);
    if(ct>0){
        ct--;
        ct--;
    }
    updateProgressBar();
}

function updateProgressBar(){
    let percentage = 0;
    const progressBarFill= document.getElementById("progress-bar-fill");
    if (tt > 0) {
        percentage = (ct / tt) * 100;
    }
    if(k>0){
        tt--;
        progressBarFill.style.width= percentage +"%";
    }
    if(ct<0){
        ct=0;
    }
    if(tt<0){
        tt=0;
    }
    percentage = Math.min(percentage, 100);
    percentage = Math.max(percentage, 0);
    progressBarFill.style.width = "0";
    setTimeout(() => {
        progressBarFill.style.width = percentage + "%";},50);
}
