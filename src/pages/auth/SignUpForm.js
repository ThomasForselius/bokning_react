import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {

  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: ''
  });
  const { username, password1, password2} = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push('/signin');
    } catch (error){
      setErrors(error.response?.data)
    }

  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-12" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Register</h1>

          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                />
            </Form.Group>
            
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
              ))}

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control className={styles.Input}
                type="password" 
                placeholder="Password" 
                name="password1"
                value={password1}
                onChange={handleChange}
                autoComplete="True"
                 />
            </Form.Group>
            
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
              ))}

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
                autoComplete="True"
                 />
            </Form.Group>

            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>{message}</Alert>
              ))}
          
            <Button className={`${styles.round}`} type="submit">
              Sign up
            </Button>
          </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://cdn.pixabay.com/photo/2021/11/13/19/27/architecture-6792169_1280.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;