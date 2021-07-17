import React from "react";
import Homepage from "./Homepage";
import Login from "./Login";
import RecipePage from "./RecipePage";
import CreateRecipePage from "./CreateRecipePage";
import Signup from "./Signup";
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
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/editUser/:userId">
          <Signup />
        </Route>
        <Route exact path="/createRecipe">
          <CreateRecipePage />
        </Route>
        {/* <ProtectedRoute
          path="/createRecipe"
          auth={auth}
          component={CreateRecipePage}
        /> */}
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
