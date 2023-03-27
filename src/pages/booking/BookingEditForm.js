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

function BookingEditForm() {

  const {id} = useParams();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState();
  const history = useHistory();
  const [bookingData, setBookingData] = useState({
    date: '',
    desc: '',
  });
  const {desc, date} = bookingData;

  useEffect(() => {
    const fetchBooking = async () => {
      try{
          const {data} = await axiosReq.get(`/bookings/${id}`)
          const {date, desc, is_owner} = data;
          is_owner ? setBookingData({desc, date, is_owner}) : history.push('/')        

      }catch(error){
          console.log(error)
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
    try{
      await axiosReq.put(`/bookings/${id}/`, bookingData);
      setSuccess("Post updated. Redirecting");
      setTimeout(() => {history.push('/bookinglist')}, 2500)
    } catch (error){
      console.log("error in catch: " ,error)
      if(error.response?.status !== 401){
        console.log(error)
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
          <Button className={`${btnStyles.Button} ${btnStyles.Black}`} type="submit">
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
        {success && 
              <Alert variant="success" className={styles.alert}>{success}</Alert>
            }
      </Row>
  );
}

export default BookingEditForm;