import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/BookingCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";

function BookingCreateForm() {
  const [errors, setErrors] = useState({});
  const [bookingData, setBookingData] = useState({
    date: '',
    username: '',
  });

  const handleChange = (event) => {
    setBookingData({
      ...bookingData,
      [event.target.name]: event.target.value
    })
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const {data} = await axios.post("/dj-rest-auth/bookings/", bookingData)
    } catch (error){
      setErrors(error.response?.data)
    }
  };

  const textFields = (
    <div className="text-center">  
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-5" controlId="date">
          <Form.Label className={`${styles.label} "d-sm"`}>Date</Form.Label>
          <Form.Control 
            className={styles.input}
            type="date"
            name="date"
            value={bookingData.date}
            onChange={handleChange}
            />
      
          <Form.Control className={styles.input} as="textarea" rows={2} name="desc" placeholder="Comment" />
        </Form.Group>

          <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
            Book
          </Button>

      </Form>
    </div>
  );

  return (
    <Form>
      <Row>
        {/* <Col className="p-2 p-sm-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                > Image upload
                </Form.Label>

            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col> */}

        <Col>
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default BookingCreateForm;