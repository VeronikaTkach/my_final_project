import React from 'react'

export const StoreContext = React.createContext()

export function StoreContextProvider ({ children }) {  

    const caseStates = ['new', 'in_progress', 'done']
    const bikeTypes = ['general', 'sport']
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const apiDomain = "https://sf-final-project-be.herokuapp.com"

    const store = {
        isLoggedIn,
        setIsLoggedIn,
        apiDomain,
        caseStates,
        bikeTypes
    }
  
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}