import { createContext, useState, useEffect } from "react"

const UserContext = createContext()

export function UserProvider({children}){

    const [userInfo, setUserInfo] = useState(() => {
        const localData =  localStorage.getItem("user info")
        return localData ? JSON.parse(localData) : {}
    })
    useEffect(() => {
        localStorage.setItem("user info", JSON.stringify(userInfo))
    }, [userInfo]);
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    ) 
}

export default UserContext
