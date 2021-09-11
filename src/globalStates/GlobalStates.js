import React, { useState, useContext } from "react";


const AuthContext = React.createContext(undefined);


export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const setLoggedIn = () => {
    setIsAuth(true);
  };
  const setLoggedOut = () => {
    setIsAuth(false);
  };
  const data = [isAuth, setLoggedIn, setLoggedOut];
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth can only be used inside AuthProvider");
  }
  return context;
};

