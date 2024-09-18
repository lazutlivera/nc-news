import { createContext, useState, useEffect } from "react";
import { getUsers } from "../components/apiCalls";



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(({users}) => {
            setUsers(users);
        });
    }, []);

    const handleChange = (e) => {
        const selectedUser = users.find(user => user.username === e.target.value);
        setUser(selectedUser);
    };


  return (
    <UserContext.Provider value={{ user, users, handleChange }}>
      {children}
    </UserContext.Provider>
  );
};
