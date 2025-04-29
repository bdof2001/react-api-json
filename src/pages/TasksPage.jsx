import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';

const url = `http://localhost:3001`;

function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${url}/tasks`)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className='tasks'>
      <h3>All Tasks!</h3>
      <Link to="/tasks/new">
        <button>Create New Task</button>
      </Link>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default TasksPage;