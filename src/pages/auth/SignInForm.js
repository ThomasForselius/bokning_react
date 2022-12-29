import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: '',
    password: ''
  });
  const { username, password} = signInData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user)
      history.push('/src/pages/posts/BookingCreateForm.js');
    } catch (error){
      setErrors(error.response?.data)
    }

  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-12" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign in</h1>

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
              <Alert variant="warning" className={styles.alert}  key={idx}>{message}</Alert>
              ))}

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control className={styles.Input}
                type="password" 
                placeholder="Password" 
                name="password"
                value={password}
                onChange={handleChange}
                autoComplete="True"
                 />
            </Form.Group>
            
            {errors.password?.map((message, idx) => (
              <Alert variant="warning" className={styles.alert} key={idx}>{message}</Alert>
              ))}
          
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" className={styles.alert} key={idx}>{message}</Alert>
              ))}
              
            <Button className={`${styles.round}`} type="submit">
              Sign in
            </Button>


          </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up!</span>
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
            "https://cdn.pixabay.com/photo/2018/01/24/15/08/live-3104077_1280.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignInForm;