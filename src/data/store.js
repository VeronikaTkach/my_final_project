import React from 'react'

export const StoreContext = React.createContext()

export function StoreContextProvider ({ children }) {  

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const apiDomain = "https://sf-final-project-be.herokuapp.com"

    const store = {
        isLoggedIn,
        setIsLoggedIn,
        apiDomain
    }
  
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}