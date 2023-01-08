import React from 'react'
import { Card } from 'react-bootstrap';
import Avatar from '../../Components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import styles from '../../styles/Booking.module.css'

const BookingDetail = (props) => {

    const {
        id, owner, date, desc, created_at
    } = props;
    const currentUser = useCurrentUser();
  return (
    <Card className={styles.Booking}>
        <Card.Body className='align-items-center justfiy-content-between'>
        <Avatar src={currentUser?.profile_image} height={30} className={styles.Avatar} />
        <h1>{date}</h1>
        </Card.Body>
    </Card>
  )
}

export default BookingDetail