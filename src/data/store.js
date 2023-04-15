import React from 'react'
export const StoreContext = React.createContext(null)

export default ({ children }) => {  
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
    const store = {
        isLoggedIn: [isLoggedIn, setIsLoggedIn]
    }
  
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}