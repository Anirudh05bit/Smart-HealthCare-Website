import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-root">
      <nav className="navbar">
        <div className="logo-img"></div>
        <div className="logocont">SHMS</div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/admin">Admin</Link>
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
