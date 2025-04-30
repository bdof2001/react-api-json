import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const url = `http://localhost:3001`;

function TaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({});

  useEffect(() => {
    axios.get(`${url}/tasks/${taskId}`)
      .then(response => setTask(response.data))
      .catch(error => console.error("Error fetching task:", error));
  }, [taskId]);

  const deleteTask = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    axios.delete(`${url}/tasks/${taskId}`)
      .then(() => navigate("/tasks"))
      .catch(error => console.error("Error deleting task:", error));
  };

  const toggleSubtask = (index) => {
    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks[index].done = !updatedSubtasks[index].done;

    axios.patch(`${url}/tasks/${taskId}`, {
      subtasks: updatedSubtasks
    })
      .then(() => {
        setTask(prev => ({
          ...prev,
          subtasks: updatedSubtasks
        }));
      })
      .catch(error => {
        console.error("Error updating subtask:", error);
      });
  };


  return (
    <div>
      <h2>Task Details (ID: {taskId})</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.done ? "Done" : "Not Done"}</p>

      {task.subtasks && task.subtasks.length > 0 && (
        <div>
          <h4>Subtasks</h4>
          <ul>
            {task.subtasks.map((subtask, index) => (
              <li key={subtask.id}>
                <input
                  type="checkbox"
                  checked={subtask.done}
                  onChange={() => toggleSubtask(index)}
                />
                {subtask.title}
              </li>
            ))}
          </ul>
        </div>
      )}



      <button onClick={deleteTask}>Delete</button>
      <br />
      <Link to={`/tasks/${taskId}/edit`}>Edit</Link> | <Link to="/tasks">Back</Link>
    </div>
  );
}

export default TaskPage;