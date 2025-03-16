// Set up local storage
document.addEventListener("DOMContentLoaded", () => {
  let storageTask = JSON.parse(localStorage.getItem("task"));

  if (storageTask) {
    storageTask.forEach((item) => task.push(item));
    updateTask();
    updateStatus();
  }
});

let task = [];

// Save tasks to local storage
const saveTask = () => {
  localStorage.setItem("task", JSON.stringify(task));
};

// Select Button
const button = document.querySelector("button");

// add Task on UI

const addTask = () => {
  const textInput = document.getElementById("textinput");
  const text = textInput.value.trim();

  if (text) {
    task.push({ text: text, completed: false });
    textInput.value = "";
  }
  updateTask();
  updateStatus();
  saveTask();
};

// delete the Ui when user Click

const deleteTask = (index) => {
  task.splice(index, 1);
  updateTask();
  updateStatus();
  saveTask();
};

// edit the content 
const editTask = (index) => {
  const taskInput = document.getElementById("textinput");
  taskInput.value = task[index].text;

  deleteTask(index);
};


const toggleTask = (index) => {
  task[index].completed = !task[index].completed;
  updateTask();
  updateStatus();
  saveTask();
};

// update the status of content when user click 

const updateStatus = () => {
  const completeTask = task.filter((task) => task.completed).length;
  const totalTask = task.length;
  const progress = (completeTask / totalTask) * 100;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  const score = document.querySelector(".score p");
  score.innerText = `${completeTask} / ${totalTask}`;

  if (task.length && completeTask === totalTask) {
    addConfetti();
  }
};

// update the Task

const updateTask = () => {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  task.forEach((newTask, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
            <div class="taskItem">
                <div class="task">
                    <input type="checkbox" name="checkbox" ${
                      newTask.completed ? "checked" : ""
                    } onchange="toggleTask(${index})">
                    <p class="${newTask.completed ? "completed" : ""}">${
      newTask.text
    }</p>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
                    <i class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i>
                </div>
            </div>
        `;

    taskList.appendChild(listItem);
  });
};

// adding event Listerner on Button click

button.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

// function for confetti when all Task is Complete

const addConfetti = () => {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration;

  let skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    const timeLeft = animationEnd - Date.now(),
      ticks = Math.max(200, 500 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ["#ffffff"],
      shapes: ["circle"],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
};
