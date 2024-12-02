const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filters = {
  all: document.getElementById("allTasks"),
  active: document.getElementById("activeTasks"),
  completed: document.getElementById("completedTasks"),
};

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter((task) =>
    filter === "all"
      ? true
      : filter === "active"
      ? !task.completed
      : task.completed
  );

  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = `task-item ${task.completed ? "completed" : ""}`;

    const taskText = document.createElement("span");
    taskText.textContent = `${task.text} (${task.date})`;
    taskText.addEventListener("dblclick", () => editTask(index));

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task.text;
    editInput.style.display = "none";
    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        updateTask(index, editInput.value);
      }
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));
    if (task.completed) checkbox.style.display = "none";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => deleteTask(index));

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(editInput);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

// Add new task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && taskInput.value.trim()) {
    const newTask = {
      text: taskInput.value.trim(),
      completed: false,
      date: new Date().toLocaleString(),
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const taskItem = taskList.children[index];
  const taskText = taskItem.querySelector("span");
  const editInput = taskItem.querySelector("input[type='text']");
  taskText.style.display = "none";
  editInput.style.display = "inline";
  editInput.focus();
}

// Update task text
function updateTask(index, newText) {
  tasks[index].text = newText;
  saveTasks();
  renderTasks();
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter tasks
filters.all.addEventListener("click", () => renderTasks("all"));
filters.active.addEventListener("click", () => renderTasks("active"));
filters.completed.addEventListener("click", () => renderTasks("completed"));

// Initial render
renderTasks();
