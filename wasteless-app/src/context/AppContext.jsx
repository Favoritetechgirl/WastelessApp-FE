import React,{ createContext } from "react";

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  
  const settings = {
    
  }

  const value = {

  }

  return (
    <AppContext.Provider value={value}>

    </AppContext.Provider>
  )
}
