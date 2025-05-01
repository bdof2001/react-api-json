import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:3001';

function Task({ task }) {
  const [isDone, setIsDone] = useState(task.done);

  useEffect(() => {
    setIsDone(task.done);
  }, [task.done]);

  const total = task.subtasks?.length || 0;
  const doneCount = task.subtasks?.filter(s => s.done).length || 0;

  const allSubtasksDone =
    !task.subtasks || task.subtasks.length === 0 ||
    task.subtasks.every(sub => sub.done);

  const toggleDone = () => {
    if (!allSubtasksDone) return;

    const newDone = !isDone;

    axios.patch(`${url}/tasks/${task.id}`, {
      done: newDone
    }).then(() => {
      setIsDone(newDone);
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
        title={allSubtasksDone ? "Mark task as done" : "Complete all subtasks first"}
      />
      <Link to={`/tasks/${task.id}`}>
        {task.title}
      </Link>
      {total > 0 && (
        <span className="subtask-counter">
          ({doneCount}/{total} subtasks done)
        </span>
      )}
    </li>
  );
}

export default Task;