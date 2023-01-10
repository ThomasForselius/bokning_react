import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CurrentUserContext } from '../context/CurrentUserContext'

function Dm() {
    const currentUser = useContext(CurrentUserContext)
    const {id } = useParams();
    console.log(id);
  return (
    <div>
        <h1>DM</h1>
        {id}
        <h2>{currentUser?.email}</h2>
        <h3>{currentUser?.last_login}</h3>
        <h3>{currentUser?.first_name}</h3>
        <h3>{currentUser?.last_name}</h3>
    </div>
  )
}

export default Dm