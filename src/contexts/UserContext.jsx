import { createContext, useState, useEffect } from "react";
import { getUsers } from "../components/apiCalls";



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(({users}) => {
            setUsers(users);
            setUser(users[0]);
        });
    }, []);

    





  return (
    <UserContext.Provider value={{ setUser, user, users}}>
      {children}
    </UserContext.Provider>
  );
};
