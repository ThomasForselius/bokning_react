import React from 'react'
import { useContext } from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext'

function Profile() {
    const currentUser = useContext(CurrentUserContext)

  return (
    <div>
        <h1>{currentUser?.username}</h1>
        <h2>{currentUser?.email}</h2>
        <h3>{currentUser?.username}</h3>
        
    </div>
  )
}

export default Profile