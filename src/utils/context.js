import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //current user information
  const [currentUser, setUser] = useState(null);

  //access tokens
  const [currentHeaders, setHeaders] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  //save user to local storage
  const localStorageLogin = (data) => {
    localStorage.setItem("User", JSON.stringify(data));
  };

  const tokenSessionStorage = (data, headers) => {
    sessionStorage.setItem("User", JSON.stringify(data));
    sessionStorage.setItem("Headers", JSON.stringify(headers));
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setUser,
        currentHeaders,
        setHeaders,
        isLoggedIn,
        setIsLoggedIn,
        loginMessage,
        setLoginMessage,

        localStorageLogin,
        tokenSessionStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
