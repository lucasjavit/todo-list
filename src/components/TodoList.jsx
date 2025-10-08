import { useState } from "react";

function TodoList() {
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState([
    { id: 1, taskName: "Do laundry", isCompleted: false },
    { id: 2, taskName: "Buy groceries", isCompleted: true },
    { id: 3, taskName: "Clean the house", isCompleted: false },
  ]);

  function addTask() {
    if (newTask.trim() === "") return; // ignore empty input

    if (todoList.length === 0) {
      setTodoList([{ id: 1, taskName: newTask }]);
      setNewTask(""); // clear input after adding
      return;
    }
    const newId = todoList[todoList.length - 1].id;

    setTodoList((prev) => [...prev, { id: newId + 1, taskName: newTask }]);
    setNewTask(""); // clear input after adding
  }

  function deleteTask(id) {
    const filterList = todoList.filter((task) => task.id !== id);
    setTodoList(filterList.length ? filterList : []);
  }

  function update(id) {
    const filterList = todoList.filter((task) => task.id !== id);
    const taskToUpdate = todoList.find((task) => task.id === id);
    const updatedTaskName = prompt("Task name:", taskToUpdate.taskName);

    if (updatedTaskName && updatedTaskName.trim() !== "") {
      const updatedTask = { ...taskToUpdate, taskName: updatedTaskName };
      setTodoList([...filterList, updatedTask].sort((a, b) => a.id - b.id));
    }
  }

  function completed(id) {
    const filterList = todoList.filter((task) => task.id !== id);
    const taskToUpdate = todoList.find((task) => task.id === id);
    const updatedTask = {
      ...taskToUpdate,
      isCompleted: taskToUpdate.isCompleted ? false : true,
    };
    setTodoList([...filterList, updatedTask].sort((a, b) => a.id - b.id));
  }

  return (
    <div>
      <h2>Todo List</h2>

      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
      <button onClick={addTask} disabled={newTask === ""}>
        Add Task
      </button>

      <ul>
        {todoList.map((task, key) => (
        <li key={key}>
        <span
          style={{
            textDecoration: task.isCompleted ? "line-through" : "none",
          }}
        >
          {task.taskName}
        </span>

        <p>{task.isCompleted ? "Task Completed" : "Task Not Completed"}</p>

        <button onClick={() => completed(task.id)}>Completed</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
        <button onClick={() => update(task.id)}>Update</button>
      </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
