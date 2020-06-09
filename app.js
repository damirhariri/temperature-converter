const form = document.getElementById("form");
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const list = document.querySelector(".list");
const clrBtn = document.getElementById("clear-task");
const filter = document.getElementById("filter");

loadEvents();

function loadEvents() {
  document.addEventListener("DOMContentLoaded", lsTasks);

  form.addEventListener("submit", insertLI);

  list.addEventListener("click", removeLi);

  clrBtn.addEventListener("click", clearTasks);

  filter.addEventListener("keyup", filterTask);
}

function insertLI(e) {
  const task = input.value;

  if (task === "") {
    alert("Please input task");
  } else {
    const li = document.createElement("li");
    li.className = "list-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    list.appendChild(li);

    setLS();

    input.value = "";
  }

  e.preventDefault();
}

function setLS() {
  const task = input.value;

  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  console.log("task saved");
}

function removeLi(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();

      deleteLS(e.target.parentElement.parentElement);
    }
  }
}

function lsTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.className = "delete";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    list.appendChild(li);
  });
}

function clearTasks(e) {
  const tasks = Array(list);

  tasks.forEach((task) => {
    task.remove();
  });

  clearLS();
}

function clearLS() {
  localStorage.clear();
}

function deleteLS(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    if (taskItem.textContent === task) {
      tasks.splice(task, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  // console.log(text);
  document.querySelectorAll(".list-item").forEach((task) => {
    const itemText = task.textContent;
    if (itemText.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
