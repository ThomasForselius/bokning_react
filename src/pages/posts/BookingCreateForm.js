import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/BookingCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function BookingCreateForm() {
  const [errors, setErrors] = useState({});
  const currentUser = useContext(CurrentUserContext);

  const history = useHistory();
  const [bookingData, setBookingData] = useState({
    date: '',
    desc: '',
  });

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
    console.log(formData);
    try{
      const {data} = await axiosReq.post("/dj-rest-auth/bookings/", formData);
      history.push('/posts/book/${data.id}')
    } catch (error){
      console.log(error)
      if(error.response?.status !== 401){
        setErrors(error.response?.data)
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
        {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" className={styles.alert} key={idx}>{message}</Alert>
              ))}
          <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
            Book 
          </Button>

      </Form>
    </div>
  );

  return (
      <Row>
        <Col>
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
  );
}

export default BookingCreateForm;