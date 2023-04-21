import React, { useState } from 'react'

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';
import Avatar from '../../Components/Avatar';
import { DropDown } from '../../Components/DropDown';
import { useCurrentUser } from '../../context/CurrentUserContext';
import styles from '../../styles/Booking.module.css'
import { axiosRes } from '../../api/axiosDefaults';

const BookingDetail = (book) => {

    const {id, owner, date, desc, owner_image} = book;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const [success, setSuccess] = useState('');
    const [newdate, setNewDate] = useState(date);
    
    const handleEdit = () => {
        history.push(`/booking/${id}/edit`)
    }

    const handleDelete = async () => {
        try{
            await axiosRes.delete(`/bookings/${id}/`)
            setTimeout(setSuccess("Post deleted. Refreshing list"), 1500)
            setNewDate('')
            setTimeout(() => {window.location.reload(false);}, 2000)
        } catch(error){
            console.log(error)
        }
   }

    return (
        <>
        {success && 
            <Alert variant="success" className={styles.alert}>
                {success}
            </Alert>
        }
        <Card className={styles.Booking}>
            <Card.Body className='align-items-center justfiy-sm-content-between p-3 mt-0 py-1'>
                <Row>
                    <Col className='ml-auto d-flex justify-content-start align-items-center' xs={5}>
                        <h5> {newdate}</h5>
                    </Col>
                    <Col className="d-flex align-items-center" xs={1}>
                    {is_owner && (
                        <>
                            <span className={styles.ThreeDots}>
                                <DropDown handleEdit={handleEdit} handleDelete={handleDelete} />
                            </span>
                        </>
                    )}
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center' xs={6}>
                    {owner} <Avatar src={owner_image} height={30} className={styles.Avatar} />
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
    </> 
  )
}

export default BookingDetail