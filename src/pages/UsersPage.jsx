import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const url = `http://localhost:3000`

function UsersPage() {

  const [users, setUsers] = useState([])

  useEffect(() => {

    // chamar a API e obter users
    axios.get(`${url}/users`)
      .then(response => {
        setUsers(response.data)
      })

  }, [])

  return (
    <div className='users'>
      <h3>Todos os Users! </h3>

      {users.map(user => (

        <Link key={user.id} to={user.id}>
          {user.name}
        </Link>

      ))}

    </div>
  )
}

export default UsersPage