var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString) {

	var listItem = document.createElement("li");

	var checkBox = document.createElement("input");

	var label = document.createElement("label");

	var editInput = document.createElement("input");

	var editButton = document.createElement("button");

	var deleteButton = document.createElement("button");

	//Each element needs modifying 

	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	//Each element needs appending
	return listItem;
}


//Add New Task
var addTask = function(){

	console.log("Add task...");

	var listItem = createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTasksHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";

}


//Edit an existing task
var editTask = function() {

	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");

	if(containsClass) {
		//Switch from .editMode
		//label text become the input's value
		label.innerText = editInput.value;

	} else {
		//Switch to .editMode
		//input value becomes the label's text
		editInput.value = label.innerText;
	}

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");

}



//Delete an existing task
var deleteTask = function() {

	console.log("Delete task...");

	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	//Remove the parent list item from the UL
	ul.removeChild(listItem);

}



//Marks task as complete
var taskCompleted = function() {

	console.log("Complete task...");

	//Append the task list item to the completed task
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}



//Mark task as incomplete
var taskIncomplete = function() {

	console.log("Incomplete task...");

	//Append the task list item to the completed task
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

}



var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

	console.log("Bind list item events");

	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;

}



//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

//cycle over icompleteTaskHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {

	bindTaskEvents( incompleteTasksHolder.children[i], taskCompleted );

}



//cycle over completedTaskHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {

	bindTaskEvents( completedTasksHolder.children[i], taskIncomplete );

}

