import './App.css'
import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import CreateUserPage from './pages/CreateUserPage'
import EditUserPage from './pages/EditUserPage'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
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
          <Route path="/users/:userId" element={<UserPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/edit-user/:userId" element={<EditUserPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<h3>404!</h3>} />
        </Routes>
      </main>
    </>
  )
}

export default App
