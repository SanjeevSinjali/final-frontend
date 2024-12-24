import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = JSON.parse(localStorage.getItem("authTokens"));
    return tokens;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(authTokens ? true : false);

  const updateTokens = (tokens) => {
    setAuthTokens(tokens);
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  };

  const logout = () => {
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
  };

  useEffect(() => {}, [authTokens, isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        authTokens,
        setAuthTokens,
        updateTokens,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
