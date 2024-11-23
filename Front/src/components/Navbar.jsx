import { React, useState, memo } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const getLinkClass = (path) => (location.pathname === path ? "active" : "");

  return (
    <div>
      <div class="navbar">
        <a href="/" class={` ${getLinkClass("/")}`}>
          Login
        </a>
        <a href="/fichar" class={` ${getLinkClass("/fichar")}`}>
          Fichar
        </a>
        <a href="/justificantes" class={` ${getLinkClass("/justificantes")}`}>
          Justificantes
        </a>
        <a href="/datos" class={` ${getLinkClass("/datos")}`}>
          Datos Personales
        </a>
      </div>
    </div>
  );
};

export default Navbar;
