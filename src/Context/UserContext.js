import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [userList, setUserList] = useState([])
    const [userId, setUserId] = useState(null)
    
    return(
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, userList, setUserList, userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}