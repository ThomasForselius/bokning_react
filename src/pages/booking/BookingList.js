import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import BookingDetail from "../booking/BookingDetail";
import styles from '../../styles/BookingCreateEditForm.module.css'
import appStyles from '../../App.module.css'
import loader from '../../assets/loading.gif'
import { useRedirect } from "../../hooks/useRedirect";

function BookingList({ filter, message }) {
    useRedirect('loggedOut')
    const [booking, setBooking] = useState({results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [isBooked, setIsBooked] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [tempList, setTempList] = useState({results: []});

    useEffect(() => { 
        const fetchBookings = async () => {
            try{
                const {data} = await axiosReq.get(`/bookings/`)
                console.log(data)
                setBooking(data)
                setHasLoaded(true)
            }catch(error){
                console.log(error)
            }
        }
        fetchBookings()
    },[])

    const checkDate = (event) => {
        setSelectedDate(event.target.value)
        for(let i = 0; i < booking.results.length; i++){
          if(booking.results[i].date.includes(event.target.value)){
            setIsBooked(true)
            setTempList(booking);
            setBooking(booking.results[i].date.includes(event.target.value))
            console.log("booking: ", booking.results[i]);
            setErrors("Chosen date is booked, choose another")
            setSuccess(null)
            break
          }
            setErrors(null)
            setSuccess("Date isn't booked!")
            setIsBooked(false)
          }
          return isBooked
      }

    return (
    <Row className="h-100">
        <Col className="py-2 p-3 p-lg-6" lg={8}>
            {errors && 
                <Alert variant="danger" className={styles.alert}>{errors}</Alert>
            }
            {success &&
                <Alert variant="success" className={styles.alert}>{success}</Alert>
            }
        <Form.Group>
                    <div className={`${styles.label} "d-sm"`}>Select date to filter</div>
                    <Form.Control
                        className={styles.input}
                        type="date"
                        name="date"
                        required
                        value={selectedDate}
                        onChange={checkDate}
                        />
                </Form.Group>
            {hasLoaded ? (
                <>
                    {  booking.results.length ? (
                        booking.results.map((book) => (
                            <BookingDetail key={book.id} {...book} />
                        )       
                    )
                    ): (
                        <Card>
                            <Card.Body className="d-flex justify-content-center align-items-top m-0 p-2">
                                <h5>{message}</h5>
                            </Card.Body>
                        </Card>
                    )}
                </>
            ) : (
                <Container className={appStyles.Container}>
                    <img src={loader} className="d-flex m-auto" alt="Loading"></img>
                </Container>
            )}
        </Col>
    </Row>
    )
}

export default BookingList;