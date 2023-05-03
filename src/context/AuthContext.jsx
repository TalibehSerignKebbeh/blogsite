// Create a new context for the authentication token
import { useEffect } from 'react';
import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

// Create a new provider component for the authentication token context
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  // Store the authentication token in local storage and update the context state
  const storeAuthToken = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(localStorage.getItem('authToken') || token);
  };
 
  // Remove the authentication token from local storage and update the context state
  const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  // Return the provider with the authentication token state and store/clear functions
  return (
    <AuthContext.Provider value={{ authToken, storeAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the authentication token context
export const useContextHook = () => useContext(AuthContext);
