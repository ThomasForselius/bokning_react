import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { axiosReq } from '../api/axiosDefaults'
import { CurrentUserContext } from '../context/CurrentUserContext'
import Avatar from './Avatar'

function Dm() {
  
    const currentUser = useContext(CurrentUserContext)
    const [user, setUser] = useState();

    useEffect(() => { 
      const fetchBookings = async () => {
          try{
              const {data} = await axiosReq.get(`/profiles/${currentUser.pk}`)
              setUser(data);
          }catch(error){
              console.log(error)
          }
      }
      fetchBookings()
  },[])

  return (
    <Card>
      <Card.Body>
        <h1>DM</h1>
        <h2>{currentUser?.email}</h2>
      </Card.Body>
    </Card>
  )
}

export default Dm