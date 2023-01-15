import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../Components/Avatar';
import { DropDown } from '../../Components/DropDown';
import { useCurrentUser } from '../../context/CurrentUserContext';
import styles from '../../styles/Booking.module.css'

const BookingDetail = (book) => {

    const {id, owner, date, desc, image} = book;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/bookings/${id}/edit`)
    }

    const handleDelete = async () => {
        try{
            await axiosRes.delete(`/bookings/${id}/`)
            console.log("delete booking...")
            history.push('/bookinglist')
        } catch(error){
            console.log(error)
        }
    }

    return (
    <Card className={styles.Booking}>
        <Card.Body className='align-items-center justfiy-sm-content-between p-3 mt-1 py-1'>
            <Row>
                <Col className='ml-auto d-flex justify-content-start' xs={5}>
                    <h5>{date}</h5>
                </Col>
                <Col xs={1}>
                {is_owner && (
                    <span className={styles.ThreeDots}>
                        <DropDown handleEdit={handleEdit} handleDelete={handleDelete} /> 
                    </span>
                )}
                </Col>
                <Col className='d-flex justify-content-end bg-light' xs={6}>
                    <Avatar src={image} height={30} className={styles.Avatar} />{owner}
                </Col>
            </Row>
            {desc && (

                <Row>
                    <Col xs={12} className={styles.desc}>
                        <p>{desc}</p>
                    </Col>
                </Row>
            )}
        </Card.Body>
    </Card>
  )
}

export default BookingDetail