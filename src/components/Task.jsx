import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:3001';

function Task({ task }) {
  const [isDone, setIsDone] = useState(task.done);

  useEffect(() => {
    setIsDone(task.done); 
  }, [task.done]);

  const allSubtasksDone =
    !task.subtasks || task.subtasks.length === 0 ||
    task.subtasks.every(sub => sub.done === true);

  const toggleDone = () => {
    if (!allSubtasksDone) return;

    const newDoneStatus = !isDone;

    axios.patch(`${url}/tasks/${task.id}`, {
      done: newDoneStatus
    }).then(() => {
      setIsDone(newDoneStatus);
    }).catch(error => {
      console.error("Error updating task status:", error);
    });
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={isDone}
        onChange={toggleDone}
        disabled={!allSubtasksDone}
        title={
          allSubtasksDone
            ? "Mark task as done"
            : "Complete all subtasks first"
        }
      />
      <Link to={`/tasks/${task.id}`}>
        {task.title}
      </Link>
      {isDone && <span> ✅</span>}
    </li>
  );
}

export default Task;
