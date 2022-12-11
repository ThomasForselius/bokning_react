import styles from './App.module.css';
import NavBar from './Components/NavBar';
import { Route, Switch } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import './api/axiosDefaults'
import axios from 'axios';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { useEffect, useState, createContext } from 'react';

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try{
      const {data} = await axios.get('/drf-rest-auth/user/')
      setCurrentUser(data)
    } catch(error){
        alert(error)
    }
  }

  useEffect(() => {
    handleMount()
  }, [])
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Homepage</h1>} />
              <Route exact path="/check" render={() => <h1>Check room</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;