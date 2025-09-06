import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;
  try {
    user = JSON.parse(atob(token.split(".")[1])); 
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }


  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
