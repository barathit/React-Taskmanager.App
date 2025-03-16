import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      addTask(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="add-task-container">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task..."
          className="add-task-input"
          value={value}
        />
        <button type="submit" className="add-task-btn">
          Add
        </button>
      </div>
    </form>
  );
}
