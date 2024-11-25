import { React, useState, memo } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const getLinkClass = (path) => (location.pathname === path ? "active" : "");

  return (
    <div>
      <div className="navbar">
        <a href="/" className={` ${getLinkClass("/")}`}>
          Login
        </a>
        <a href="/fichar" className={` ${getLinkClass("/fichar")}`}>
          Fichar
        </a>
        <a
          href="/justificantes"
          className={` ${getLinkClass("/justificantes")}`}
        >
          Justificantes
        </a>
        <a href="/datos" className={` ${getLinkClass("/datos")}`}>
          Datos Personales
        </a>
      </div>
    </div>
  );
};

export default Navbar;
