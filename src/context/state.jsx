import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem('token') || '');
  const [userId, setUserId] = useState(() => sessionStorage.getItem('userId') || '');

  useEffect(() => {
    sessionStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    sessionStorage.setItem('userId', userId);
  }, [userId]);

  return (
    <AppContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};