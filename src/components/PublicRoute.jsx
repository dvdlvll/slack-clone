import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ isLoggedIn, children }) {
  if (isLoggedIn === false) {
    return children;
  }
  return <Navigate to="/main" replace />;
}

export default PublicRoute;
