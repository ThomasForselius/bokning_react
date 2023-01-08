import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import BookingDetail from "../booking/BookingDetail";

function BookingList() {
    const { id } = useParams();
    const [booking, setBooking] = useState({results: [] });
    
    useEffect(() => {
        const handleMount = async () => {
            try{
                const [{data: booking}] = await Promise.all([
                    axiosReq.get(`/bookings/${id}`),
                ]);
                setBooking({results: [booking]})
                console.log(booking);
            } catch(error){
                console.log(error)
            }
        };
        handleMount();
    },[id]);

return (
    <Row className="h-100">
        <Col className="py-2 p-3 p-lg-6" lg={8}>
            <p className="text-center">Current booking list</p>
                <BookingDetail {...booking.results[0]} setBookings={setBooking} BookingList />
        </Col>
    </Row>
    )
}

export default BookingList;