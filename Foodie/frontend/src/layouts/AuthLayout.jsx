import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="">
      <Navbar type="auth" />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
