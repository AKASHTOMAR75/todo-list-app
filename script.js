const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Page load hone par saved tasks load karein
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

// Enter key press karne par bhi task add ho sake
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText, false);
  saveTaskToLocalStorage(taskText, false);

  taskInput.value = "";
}

function createTaskElement(text, isCompleted) {
  const li = document.createElement("li");
  if (isCompleted) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTaskToLocalStorage(text, isCompleted) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ text, completed: isCompleted });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => createTaskElement(task.text, task.completed));
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
