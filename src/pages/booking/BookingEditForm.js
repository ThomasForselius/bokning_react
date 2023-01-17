import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/BookingCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";

function BookingEditForm() {

  const {id} = useParams();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState();
  const currentUser = useCurrentUser();
  const history = useHistory();
  const [bookingData, setBookingData] = useState({
    date: '',
    desc: '',
    is_owner: '',
  });

  const {desc, date, is_owner} = bookingData;

  useEffect(() => {
    const fetchBooking = async () => {
      try{
          const {data} = await axiosReq.get(`/bookings/${id}`)
          console.log("loaded data for id: " , id)
          const {date, desc, is_owner} = data;
          is_owner ? setBookingData({desc, date, is_owner}) : history.push('/')

      }catch(error){
          console.log(error)
          console.log("error loading")
      }
  }
    fetchBooking()
}, [history, id])

  const handleChange = (event) => {
    setBookingData({
      ...bookingData,
      [event.target.name]: event.target.value
    })
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('date', date)
    formData.append('desc', desc)
    try{
      console.log("updating post")
      await axiosReq.put(`/bookings/${id}`, formData);
      history.push('/bookinglist')
    } catch (error){
      console.log(error)
      if(error.response?.status !== 401){
        setErrors(error.response?.data);
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
            as="textarea" 
            rows={2} 
            name="desc" 
            placeholder="Comment"
            value={desc}
            onChange={handleChange} 
            />
        </Form.Group>
          <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
            Save booking
          </Button>

      </Form>
    </div>
  );

  return (
      <Row>
        <Col>
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        {success?.map((message, idx) => (
              <Alert variant="warning" className={styles.alert}  key={idx}>{message}</Alert>
              ))}
      </Row>
  );
}

export default BookingEditForm;