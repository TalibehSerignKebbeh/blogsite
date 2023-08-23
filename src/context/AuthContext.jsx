// Create a new context for the authentication token
import { useEffect } from 'react';
import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

// Create a new provider component for the authentication token context
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [dark, setdark] = useState(localStorage.getItem('dark') || false);

  // Store the authentication token in local storage and update the context state
  const storeAuthToken = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };
 
  const toggleDark = () => {
    localStorage.setItem('dark', !dark)
    setdark(prev => !prev)
    
  }
  // Remove the authentication token from local storage and update the context state
  const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  // Return the provider with the authentication token state and store/clear functions
  return (
    <AuthContext.Provider value={{
      authToken, storeAuthToken,
      clearAuthToken,
      dark, setdark, toggleDark,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the authentication token context
export const useContextHook = () => useContext(AuthContext);
