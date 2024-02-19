const fs = require("fs");
const path = require("path");
const readline = require("readline");

const tasksFilePath = path.join(__dirname, "tasks.json");

//todo: Load tasks from the JSON file
function loadTasks() {
  try {
    const tasksData = fs.readFileSync(tasksFilePath);
    return JSON.parse(tasksData);
  } catch (error) {
    return [];
  }
}

//todo: Save tasks to the JSON file
function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

//todo: Function to add a new task
function addTask(taskName) {
  const tasks = loadTasks();
  tasks.push({ name: taskName, completed: false });
  saveTasks(tasks);
  console.log(`Task "${taskName}" added successfully.`);
}

//todo: Function to view all tasks
function viewTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
  } else {
    console.log("List of tasks:");
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1}. ${task.name} - ${
          task.completed ? "Completed" : "Not Completed"
        }`
      );
    });
  }
}

//todo: Function to mark a task as complete
function markTaskComplete(taskIndex) {
  const tasks = loadTasks();
  if (taskIndex >= 1 && taskIndex <= tasks.length) {
    tasks[taskIndex - 1].completed = true;
    saveTasks(tasks);
    console.log(`Task ${taskIndex} marked as complete.`);
  } else {
    console.log("Invalid task index.");
  }
}

//todo: Function to remove a task
function removeTask(taskIndex) {
  const tasks = loadTasks();
  if (taskIndex >= 1 && taskIndex <= tasks.length) {
    const removedTask = tasks.splice(taskIndex - 1, 1);
    saveTasks(tasks);
    console.log(`Task "${removedTask[0].name}" removed successfully.`);
  } else {
    console.log("Invalid task index.");
  }
}

//todo: main function to handle all situation
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter the number for the desired action:\n(1) Add a new task\n(2) View tasks\n(3) Mark a task as complete\n(4) Remove a task\n",
    (answer) => {
      switch (answer.trim()) {
        case "1":
          rl.question("Enter the name of the task: ", (taskName) => {
            addTask(taskName);
            rl.close();
          });
          break;
        case "2":
          viewTasks();
          rl.close();
          break;
        case "3":
          rl.question(
            "Enter the index of the task to mark as complete: ",
            (index) => {
              markTaskComplete(parseInt(index));
              rl.close();
            }
          );
          break;
        case "4":
          rl.question("Enter the index of the task to remove: ", (index) => {
            removeTask(parseInt(index));
            rl.close();
          });
          break;
        default:
          console.log("Invalid option.");
          rl.close();
      }
    }
  );
}
main();
