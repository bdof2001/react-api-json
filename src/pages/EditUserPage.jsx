import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const url = `http://localhost:3000`

function EditUserPage() {

  const { userId } = useParams() // <- Adicionar
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [age, setAge] = useState("")

  // Adicionar! Autopreencher dados existentes
  useEffect(() => {
    axios.get(`${url}/users/${userId}`)
      .then(response => {
        const user = response.data
        setName(user.name)
        setSurname(user.surname)
        setAge(user.age)
      })
  }, [])

  const handleSubmit = (e) => {

    e.preventDefault()

    axios.put(`${url}/users/${userId}`, {
      name, surname, age
    }).then(response => {

      console.log(response.status)
      // Se foi submetido, status 200 (trocar para 200)
      if (response.status === 200) {
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

        {/* Change */}
        <button type="submit">Guardar Alterações</button>
      </form>

    </div>
  )
}

export default EditUserPage