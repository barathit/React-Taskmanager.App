import { useRef, useEffect } from "react";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  const listRef = useRef(null);

  // Add animation class to new task
  useEffect(() => {
    if (tasks.length > 0) {
      const lastTaskEl = listRef.current?.lastChild;
      if (lastTaskEl) {
        lastTaskEl.classList.add("new-task");
        setTimeout(() => {
          lastTaskEl.classList.remove("new-task");
        }, 500);
      }
    }
  }, [tasks.length]);

  const handleDelete = (id) => {
    const taskElement = document.getElementById(`task-${id}`);
    if (taskElement) {
      taskElement.classList.add("delete-animation");
      setTimeout(() => {
        deleteTask(id);
      }, 400);
    } else {
      deleteTask(id);
    }
  };

  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <div className="empty-list">No tasks yet. Add one above!</div>
      ) : (
        <ul className="task-list" ref={listRef}>
          {tasks.map((task) => (
            <li
              key={task.id}
              id={`task-${task.id}`}
              className={task.completed ? "completed" : ""}
            >
              <div className="task-content" onClick={() => toggleTask(task.id)}>
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="delete"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
