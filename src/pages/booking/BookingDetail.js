import React from 'react'
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Avatar from '../../Components/Avatar';
import { useCurrentUser } from '../../context/CurrentUserContext';
import styles from '../../styles/Booking.module.css'

const BookingDetail = (props) => {
    const {
        id,
        owner, 
        date, 
        desc, 
        created_at, 
        BookinList
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
  
    return (
    <Card className={styles.Booking}>
        {}
        <Card.Body className='align-items-center justfiy-content-between'>
            <Avatar src={currentUser?.profile_image} height={30} className={styles.Avatar} />{owner}
            <div>
                <p>{id}{created_at} {owner}</p>
            </div>
        </Card.Body>
    </Card>
  )
}

export default BookingDetail