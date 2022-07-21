import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ isLoggedIn, children }) {
  if (isLoggedIn === false) {
    return <Navigate to="/landing" replace />;
  }
  return children;
}

export default PrivateRoute;
