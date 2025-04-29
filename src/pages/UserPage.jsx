import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const url = `http://localhost:3000`

function UserPage() {

  const navigate = useNavigate()

  const { userId } = useParams()
  const [user, setUser] = useState({})

  // chamar a API e obter um único user
  useEffect(() => {
    axios.get(`${url}/users/${userId}`)
      .then(response => {
        setUser(response.data)
      })
  }, [])

  // Eliminar user e redirecionar para /users
  const eliminarUser = () => {
    axios.delete(`${url}/users/${userId}`)
      .then(response => {
        navigate(`/users`)
      })
  }

  return (
    <div>
      <div>Dados do Utilizador com id {userId}</div>
      <div>Nome: {user.name}</div>
      <div>Apelido: {user.surname}</div>
      <div>Idade: {user.age}</div>

      <button onClick={eliminarUser}>Eliminar</button>

      <Link to={`/edit-user/${userId}`}>Editar</Link>
      <Link to={`/users`}>Voltar</Link>
    </div>
  )
}

export default UserPage