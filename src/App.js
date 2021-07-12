import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Routes from "./components/Routes";
import { AuthProvider } from "./AuthContext";
import Cookies from "js-cookie";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(false);

  function readCookie() {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      setAuth(true);
    }
  }

  useEffect(() => {
    readCookie();
  }, []);

  console.log(auth);
  return (
    <>
      <AuthProvider>
        <Header />
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
