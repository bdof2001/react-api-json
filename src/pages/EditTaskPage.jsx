import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = `http://localhost:3001`;

function EditTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    axios.get(`${url}/tasks/${taskId}`)
      .then(res => {
        const task = res.data;
        setTitle(task.title);
        setDescription(task.description || '');
        setPriority(task.priority || 'medium');
      })
      .catch(error => console.error("Error loading task:", error));
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.patch(`${url}/tasks/${taskId}`, {
      title,
      description,
      priority
    }).then(() => {
      navigate('/tasks');
    }).catch(error => console.error("Error updating task:", error));
  };

  return (
    <div className="create-task">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="btn btn-add">Save Changes</button>
      </form>
    </div>
  );
}

export default EditTaskPage;