import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = `http://localhost:3001`;

function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from API
    axios.get(`${url}/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div className='tasks'>
      <h3>All Tasks!</h3>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/tasks/${task.id}`}>
              {task.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;