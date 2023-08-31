// Create a new context for the authentication token
import { useEffect } from 'react';
import { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

// Create a new provider component for the authentication token context
export const AppContextProvider = ({ children }) => {
  const [dark, setdark] = useState(localStorage.getItem('dark') || false);
  const [showSearch, setshowSearch] = useState(true);

  const toggleDark = () => {
    localStorage.setItem('dark', !dark)
    setdark(prev => !prev)
    
  }

  return (
    <AppContext.Provider value={{
      dark, setdark, toggleDark,
      showSearch, setshowSearch
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to access the authentication token context
export const useContextHook = () => useContext(AppContext);
