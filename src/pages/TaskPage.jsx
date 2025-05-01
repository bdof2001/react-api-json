import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const url = `http://localhost:3001`;

function TaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    axios.get(`${url}/tasks/${taskId}`)
      .then(res => setTask(res.data))
      .catch(err => console.error("Error loading task:", err));
  }, [taskId]);

  const deleteTask = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    axios.delete(`${url}/tasks/${taskId}`)
      .then(() => navigate("/tasks"))
      .catch(err => console.error("Error deleting task:", err));
  };

  const toggleSubtask = (index) => {
    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks[index].done = !updatedSubtasks[index].done;

    axios.patch(`${url}/tasks/${taskId}`, {
      subtasks: updatedSubtasks
    }).then(() => {
      setTask(prev => ({
        ...prev,
        subtasks: updatedSubtasks
      }));
    }).catch(err => console.error("Error updating subtask:", err));
  };

  const addSubtask = () => {
    if (!newSubtaskTitle.trim()) return;

    const newSubtask = {
      id: Date.now(),
      title: newSubtaskTitle.trim(),
      done: false
    };

    const updatedSubtasks = [...(task.subtasks || []), newSubtask];

    axios.patch(`${url}/tasks/${taskId}`, {
      subtasks: updatedSubtasks
    }).then(() => {
      setTask(prev => ({
        ...prev,
        subtasks: updatedSubtasks
      }));
      setNewSubtaskTitle('');
    }).catch(err => console.error("Error adding subtask:", err));
  };

  const deleteSubtask = (index) => {
    const updatedSubtasks = [...task.subtasks];
    updatedSubtasks.splice(index, 1); // remove a subtarefa

    axios.patch(`${url}/tasks/${taskId}`, {
      subtasks: updatedSubtasks
    }).then(() => {
      setTask(prev => ({
        ...prev,
        subtasks: updatedSubtasks
      }));
    }).catch(err => console.error("Error deleting subtask:", err));
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="task-details">
      <div className="task-header">
        <h2>Task Details (ID: {taskId})</h2>
        <div className="task-info">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.done ? "Done" : "Not Done"}</p>
        </div>

        <div className="task-actions-row">
          <button className="btn btn-delete" onClick={deleteTask}>Delete</button>
          <Link to={`/tasks/${taskId}/edit`}>
            <button className="btn btn-edit">Edit</button>
          </Link>
        </div>

        <div className="task-links task-back-link">
          <Link to="/tasks">Back</Link>
        </div>
      </div>


      {task.subtasks && (
        <div>
          <h3>Subtasks</h3>
          <ul>
            {task.subtasks.map((sub, index) => (
              <li key={sub.id}>
                <div className="subtask-left">
                  <input
                    type="checkbox"
                    checked={sub.done}
                    onChange={() => toggleSubtask(index)}
                  />
                  {sub.title}
                </div>
                <button className="btn-delete" onClick={() => deleteSubtask(index)}>Delete</button>
              </li>
            ))}
          </ul>

          <h4>Add Subtask</h4>
          <div className="add-subtask">
            <input
              type="text"
              placeholder="Subtask title"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
            />
            <button className="btn-add" onClick={addSubtask}>Add</button>

          </div>
        </div>
      )}
    </div>
  );
}

export default TaskPage;