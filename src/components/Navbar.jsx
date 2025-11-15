import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="navbar-root">
      <nav className="navbar">
        <div className="logo-x">
          <div className="logo-img"></div>
          <div className="logocont">SHMS</div>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/admin">Admin</Link>
          {user && (
            <>
              <span className="user-name">{user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
