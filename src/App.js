import styles from './App.module.css';
import NavBar from './Components/NavBar';
import { Route, Switch } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Homepage</h1>} />
          <Route exact path="/check" render={() => <h1>Check room</h1>} />
          <Route exact path="/signin" render={() => <h1>Sign in</h1>} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;