import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import RecipePage from "./components/RecipePage";
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
          <Route exact path="/recipe/:id">
            <RecipePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
