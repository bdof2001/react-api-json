import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const url = `http://localhost:3000`

function CreateUserPage() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [age, setAge] = useState("")

  const handleSubmit = (e) => {

    e.preventDefault()

    axios.post(`${url}/users`, {
      name, surname, age
    }).then(response => {
      // Se foi submetido
      if (response.status === 201) {
        navigate(`/users`)
      }
    })

  }

  return (
    <div>

      <form action="" onSubmit={handleSubmit}>

        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="surname">Sobrenome:</label>
          <input type="text" name='surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>

        <div>
          <label htmlFor="age">Idade:</label>
          <input type="text" name='age' value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <button type="submit">Adicionar</button>
      </form>

    </div>
  )
}

export default CreateUserPage