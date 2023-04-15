import React from 'react'

export const StoreContext = React.createContext()

export function StoreContextProvider ({ children }) {  

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const store = {
        isLoggedIn,
        setIsLoggedIn
    }
  
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}