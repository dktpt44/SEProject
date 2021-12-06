import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  email:'',
  isLoggedIn: false,
  login: (token, useremail) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const savedToken = localStorage.getItem('token');
  const savedEmail = localStorage.getItem('email');
  const [token, setToken] = useState(savedToken);
  const [useremail, setEmail] = useState(savedEmail);
  const userIsLoggedIn = !!token;

  const loginHandler = (token, useremail) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', useremail)
    setToken(token);
    setEmail(useremail);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setEmail(null);

  };

  const contextValue = {
    token: token,
    email: useremail,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;