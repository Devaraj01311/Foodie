import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar type="main" />
      <Outlet />
    </div>
  );
};

export default MainLayout;
