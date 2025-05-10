import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Navbar.css"; 

const Layout = () => {
  const getNavClass = ({ isActive }) =>
    isActive ? "navlink active" : "navlink";

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-links">
            <NavLink to="/home" className={getNavClass}>
              Home
            </NavLink>
            <NavLink to="/viewprogress" className={getNavClass}>
              View Progress
            </NavLink>
            <NavLink to="/settings" className={getNavClass}>
              Settings
            </NavLink>
            <NavLink to="/about" className={getNavClass}>
              About
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
