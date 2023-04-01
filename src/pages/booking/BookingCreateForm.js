import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/BookingCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

function BookingCreateForm() {
  
  useRedirect('loggedOut')
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');
  const [isBooked, setIsBooked] = useState(true);
  const [list, setList] = useState('');
  const [bookingData, setBookingData] = useState({
    date: '',
    desc: '',
  });
  const {date, desc} = bookingData;

  const history = useHistory();

  useEffect(() => { 
    const fetchBookings = async () => {
        try{
            const {data} = await axiosReq.get(`/bookings/`)
            setList(data)
            console.log("dates loaded")
        }catch(error){
            console.log("error", error)
        }
    }
    fetchBookings()
},[])

  const handleChange = (event) => {
    setBookingData({
      ...bookingData,
      [event.target.name]: event.target.value
    })
    if(event.target.name === "date"){
      checkDate(event.target.value)
      console.log("date: ", event.target.value)
    }
  };

  const checkDate = (selectedDate) => {
    for(let i = 0; i < list.results.length; i++){
      if(list.results[i].date.includes(selectedDate)){
        setIsBooked(true)
        console.log("date is booked, try again")
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await axiosReq.post("/bookings/", bookingData);
      setSuccess("Added booking to list... Redirecting")
      setTimeout(() => {history.push('/bookinglist');}, 3000)
    } catch (error){
      console.log(error)
      setErrors(error.response?.data);
      if(error.response?.status !== 401){
      }
    }
  };

  const textFields = (
    <div className="text-center">  
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-0" controlId="date">
          <Form.Label className={`${styles.label} "d-sm"`}>Date</Form.Label>
          <Form.Control
            className={styles.input}
            type="date"
            name="date"
            required
            value={date}
            onChange={handleChange}
            />

          <Form.Control 
            className={styles.input}  
            rows={2} 
            name="desc" 
            placeholder="Comment"
            value={desc}
            onChange={handleChange} 
            disabled={isBooked}
            />
        </Form.Group>
          <Button className={`${btnStyles.Button} ${btnStyles.Orange}`} type="submit" id="submit" disabled={isBooked}>
            Book 
          </Button>
          {errors && 
            <Alert variant="danger" className={styles.alert}>{errors}</Alert>
          }
          {success &&
            <Alert variant="success" className={styles.alert}>{success}</Alert>
          }
      </Form>
    </div>
  );

  return (
      <Row>
        <Col>
            {textFields}
        </Col>
      </Row>
  );
}

export default BookingCreateForm;