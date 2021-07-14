import React from "react";
import Homepage from "./Homepage";
import Login from "./Login";
import RecipePage from "./RecipePage";
import createRecipe from "./createRecipe";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../AuthContext";
import { Switch, Route, Redirect } from "react-router-dom";

export default function Routes() {
  const [auth] = useAuth();

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <ProtectedLogin exact path="/login" auth={auth} component={Login} />
        <Route exact path="/recipe/:id">
          <RecipePage />
        </Route>
        <ProtectedRoute
          path="/createRecipe"
          auth={auth}
          component={createRecipe}
        />
      </Switch>
    </>
  );
}

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};
