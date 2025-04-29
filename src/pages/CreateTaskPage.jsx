import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = `http://localhost:3001`;

function CreateTaskPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${url}/tasks`, {
      title,
      description,
      priority,
      done: false
    }).then(response => {
      if (response.status === 201) {
        navigate('/tasks');
      }
    }).catch(error => {
      console.error("Error creating task:", error);
    });
  };

  return (
    <div>
      <h2>Create New Task</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTaskPage;