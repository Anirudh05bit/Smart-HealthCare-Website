import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-root">
      <nav className="navbar">
        <div className="logo-x">
          <div className="logo-img"></div>
          <div className="logocont">GuruDharma</div>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
