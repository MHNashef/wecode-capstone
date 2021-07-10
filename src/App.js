import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import RecipePage from "./components/RecipePage";
import createRecipe from "./components/createRecipe";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthApi from "./AuthApi";
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
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/recipe/:id">
              <RecipePage />
            </Route>
            <ProtectedRoute path="/createRecipe" auth={auth} component={createRecipe} />
          </Switch>
        </Router>
      </AuthApi.Provider>
    </>
  );
}

export default App;
