import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ThemeSwitcher from "./ThemeSwitcher";
import "./TaskManager.css";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      <TaskForm addTask={addTask} />

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TaskList
        tasks={getFilteredTasks()}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      {tasks.length > 0 && (
        <div className="task-counter">
          <span>{tasks.length - completedCount} remaining</span>
          <span>{completedCount} completed</span>
        </div>
      )}

      {completedCount > 0 && (
        <button className="clear-all-btn" onClick={clearCompletedTasks}>
          Clear Completed
        </button>
      )}

      {tasks.length > 0 && (
        <button className="clear-all-btn" onClick={clearAllTasks}>
          Clear All
        </button>
      )}

      {/* Add the Theme Switcher component */}
      <ThemeSwitcher />
    </div>
  );
}
