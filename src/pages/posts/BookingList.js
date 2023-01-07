import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import appStyles from '../../App.module.css'
import { axiosReq } from "../../api/axiosDefaults";
import Booking from "./Booking";

function BookingList() {
    const {id} = useParams();
    const [booking, setBooking] = useState({results: []});
    const { username, desc, date} = booking;

    useEffect(() => {
        const handleMount = async () => {
            try{
                const [{data: booking}] = await Promise.all([
                    axiosReq.get(`/bookings/${id}`)
                ])
                setBooking({results: [booking]})
                console.log(booking)
            }
                catch(error){
                console.log(error)
            }
        }
        handleMount();
    }, [id]);

return (
    <Row className="h-100">
        <Col className="py-2 p-3 p-lg-6" lg={8}>
            <p>{desc}</p>
            <Booking {...booking.results[0]} setBooking={setBooking} Booking />
            <Container className={appStyles.Content}>
                Comments
            </Container>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-2 p-lg-2">
            Desktop bookings
        </Col>
    </Row>

    )

}

export default BookingList;