import React from "react";
import { Route, Redirect } from "react-router-dom";

//
/**
 * This HOC redirect the user to the sign in page if not authenticated.
 * @param {*} param0 Component used for React Router
 */
export default function PrivateRoute({ component: Component, ...rest }) {
  const tokenStoraged = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!tokenStoraged) {
          return <Redirect to="/auth" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}
