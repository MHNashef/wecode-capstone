import React from "react";

export default function ProtectedLogin({
  auth,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/recipes" />)}
    />
  );
}
