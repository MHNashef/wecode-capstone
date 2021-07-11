import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import RecipePage from "./components/RecipePage";
import CreateRecipePage from "./components/CreateRecipePage";
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/recipe/:id">
            <RecipePage />
          </Route>
          <Route exact path="/createRecipe">
            <CreateRecipePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
