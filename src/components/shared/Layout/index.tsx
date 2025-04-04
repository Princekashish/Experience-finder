import React from "react";
import Header from "../Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer";

const Layout: React.FC = () => {
  const location = useLocation();
  const isSignupPage = location.pathname === "/auth/signup" || location.pathname==="/auth/login";
  return (
    <div>
       {!isSignupPage && <Header />}
      <Outlet />
      <Footer/>
      
      
    </div>
  );
};

export default Layout;
