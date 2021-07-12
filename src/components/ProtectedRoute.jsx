import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoutes({
  auth,
  component: Component,
  ...rest
}) {
  return (
    <>
      (
      <Route
        {...rest}
        render={() => (auth ? <Component /> : <Redirect to="/login" />)}
      />
      );
    </>
  );
}
