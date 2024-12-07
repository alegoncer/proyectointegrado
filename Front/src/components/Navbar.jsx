import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  // Verificar si el usuario está logueado
  const isLoggedIn = !!localStorage.getItem("auth_token");

  // Verificar si el usuario es rrhh
  const isRRHH = localStorage.getItem("rrhh") === "true";

  const getLinkClass = (path) => (location.pathname === path ? "active" : "");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.error("No se encontró un token.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Limpia el almacenamiento local
        localStorage.removeItem("auth_token");
        localStorage.removeItem("rrhh");

        // Cierra el dropdown y redirige al inicio
        setShowDropdown(false);
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Error al cerrar sesión:", errorData.message);
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err.message);
    }
  };

  return (
    <div>
      <div className="navbar">
        {/* Enlaces principales */}
        {!isLoggedIn && (
          <a href="/" className={`${getLinkClass("/")}`}>
            Login
          </a>
        )}

        {isLoggedIn && (
          <a href="/clockIn" className={`${getLinkClass("/clockIn")}`}>
            Fichar
          </a>
        )}

        {isLoggedIn && (
          <a href="/Absence" className={`${getLinkClass("/absence")}`}>
            Justificantes
          </a>
        )}

        {isLoggedIn && (
          <a
            href="/PersonalData"
            className={`${getLinkClass("/PersonalData")}`}
          >
            Sus datos
          </a>
        )}
        {/* Menu de configuración */}
        {isLoggedIn && (
          <div className="navbar-right">
            <button className="dropbtn" onClick={toggleDropdown}>
              ⚙️
            </button>
            {showDropdown && (
              <ul className="dropdown-list">
                {isLoggedIn && isRRHH && (
                  <>
                    <li>
                      <a href="/users">Lista de usuarios</a>
                    </li>
                    <li>
                      <a href="/register">Nuevo usuario</a>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Para prevenir la navegación
                        handleLogout();
                      }}
                      className=""
                    >
                      Cerrar sesión
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
