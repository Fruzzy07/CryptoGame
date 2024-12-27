import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [balance, setBalance] = useState(0.0001);

  return (
    <GlobalStateContext.Provider value={{ balance, setBalance }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
