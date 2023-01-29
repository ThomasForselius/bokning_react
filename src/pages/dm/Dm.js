import React, { useEffect, useState } from 'react'
import { useContext } from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { axiosReq } from '../../api/axiosDefaults'
import Avatar from '../../Components/Avatar'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import loader from '../../assets/loading.gif'
import appStyles from '../../App.module.css'
import { useRedirect } from "../../hooks/useRedirect";

function Dm() {

    useRedirect('loggedOut')
    const currentUser = useContext(CurrentUserContext)
    const [user, setUser] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [messages, setMessages] = useState([])
  
    useEffect(() => { 
      const fetchBookings = async () => {
          try{
              const {data} = await axiosReq.get(`/profiles/${currentUser.pk}`);
              setUser(data);
              setHasLoaded(true)
          }catch(error){
              console.log(error)
          }
      }
      fetchBookings()
  },[currentUser])

  return (

    <Row>
      <Col className="py-2 p-2 p-lg-2" lg={12}>
        <Container className={appStyles.Content}>
        {hasLoaded ? (
        <Row className='d-flex'>
          <Col>
              <Avatar src={user.image} height={50} />
          </Col>
          <Col className='d-flex justify-center'>
            <h2>{user.owner}</h2>
          </Col>
        </Row>
        ) : (
                    <img src={loader} className="d-flex m-auto" alt="Loading"></img>
                )}
        </Container>
      </Col>
    </Row>
  )
}

export default Dm