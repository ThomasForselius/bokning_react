import React from 'react';
import styles from '../../styles/Booking.module.css';
import {useCurrentUser} from '../../context/CurrentUserContext';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../Components/Avatar';

const Booking = (props) => {
    const { id, owner, date, desc, created_at, Booking } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

  return (
    <Card className={styles.Booking}>
        <Card.Body>
            <Media className='align-items-center justify-content-between'>
                <Card.Title className='d-flex justify-content-between'>
                    {date}
                <Link to={`/profiles/${owner}`} className="d-flex justify-content-end">
                    {/* <Avatar src={owner} height={55} /> */}
                    {owner}
                </Link>
                </Card.Title>
                <div className="d-flex align-items-center">
                    <span>Booked on: {created_at}</span>
                    {is_owner && Booking && '...'}
                </div>
            </Media>
        </Card.Body>
    </Card>
  )
}

export default Booking