import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
