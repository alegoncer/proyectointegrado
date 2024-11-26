import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const getLinkClass = (path) => (location.pathname === path ? "active" : "");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className="navbar">
        {/* Enlaces principales */}
        <a href="/" className={`${getLinkClass("/")}`}>
          Login
        </a>
        <a href="/clockIn" className={`${getLinkClass("/clockIn")}`}>
          Fichar
        </a>
        <a href="/Absence" className={`${getLinkClass("/absence")}`}>
          Justificantes
        </a>
        <a href="/PersonalData" className={`${getLinkClass("/PersonalData")}`}>
          Sus datos
        </a>

        {/* Menú de configuración */}
        <div className="navbar-right">
          <button className="dropbtn" onClick={toggleDropdown}>
            ⚙️
          </button>
          {showDropdown && (
            <ul className="dropdown-list">
              <li>
                <a href="/users">Lista de usuarios</a>
              </li>
              <li>
                <a href="/register">Nuevo usuario</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
