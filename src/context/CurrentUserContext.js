import { createContext, useContext } from "react";
import { useEffect, useState, createContext } from 'react';
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)

export const CurrentUserProvider = ({children}) => {

const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try{
      const {data} = await axios.get('/drf-rest-auth/user/')
      setCurrentUser(data)
    } catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
    handleMount()
  }, []);

}

return (

    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>

)