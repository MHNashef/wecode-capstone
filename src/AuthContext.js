import Cookies from "js-cookie";
import React from "react";

const AuthContext = React.createContext();

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function AuthProvider(props) {
  const [auth, setAuth] = React.useState(() => {
    const sessionid = Cookies.get("sessionid");
    return sessionid ? true : false;
  });

  //const value = React.useMemo(() => [auth, setAuth], [auth]);
  const value = [auth, setAuth];

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthProvider, useAuth };
