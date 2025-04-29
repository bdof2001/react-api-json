import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <NavLink to={`/tasks`}>All Tasks</NavLink>
      <NavLink to={`/tasks/new`}>Create Task</NavLink>
      <NavLink to={`/about`}>About</NavLink>
    </nav>
  )
}

export default NavBar