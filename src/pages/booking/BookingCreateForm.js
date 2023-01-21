import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import styles from "../../styles/BookingCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function BookingCreateForm() {
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [bookingData, setBookingData] = useState({
    date: '',
    desc: '',
  });
  const history = useHistory();

  const handleChange = (event) => {
    setBookingData({
      ...bookingData,
      [event.target.name]: event.target.value
    })
    setDisabled(false)
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await axiosReq.post("/bookings/", bookingData);
      setDisabled(true)
      setSuccess("Added booking to list... Redirecting")
      setTimeout(() => {history.push('/bookinglist');}, 3000)
    } catch (error){
      console.log(error)
      setErrors(error.response?.data);
      if(error.response?.status !== 401){
      }
    }
  };

  const {date, desc} = bookingData;

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
          <Button className={isDisabled ? `${styles.hidden}` : `${btnStyles.Button} ${btnStyles.Black}`} type="submit" id="submit" disabled={isDisabled}>
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