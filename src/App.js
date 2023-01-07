import styles from './App.module.css';
import NavBar from './Components/NavBar';
import { Route, Switch } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import Profile from './Components/Profile';
import Dm from './Components/Dm';
import BookingCreateForm from './pages/posts/BookingCreateForm';
import BookingList from './pages/posts/BookingList';

function App() {  
  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>home</h1>} />
              <Route exact path="/posts/book" render={() => <BookingCreateForm />} />
              <Route exact path="/posts/:id" render={() => <BookingList />} />
              <Route exact path="/dm" render={() => <Dm />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/signout" render={() => <SignUpForm />} />
              <Route exact path="/profile" render={() => <Profile />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;