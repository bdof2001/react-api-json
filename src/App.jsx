import './App.css'
import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import CreateTaskPage from './pages/CreateTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import HomePage from './pages/HomePage'
import TaskPage from './pages/TaskPage'
import TasksPage from './pages/TasksPage'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:taskId" element={<TaskPage />} />
          <Route path="/tasks/new" element={<CreateTaskPage />} />
          <Route path="/tasks/:taskId/edit" element={<EditTaskPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<h3>404!</h3>} />
        </Routes>
      </main>
    </>
  )
}

export default App
