import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <div className="layout">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
