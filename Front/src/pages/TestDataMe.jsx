import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Recupera el token almacenado

        if (!token) {
          setError("No estás autenticado.");
          return;
        }

        const response = await fetch("http://localhost:8000/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Envía el token en el encabezado
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la información del usuario.");
        }

        const data = await response.json();
        setUser(data.user); // Almacena los datos del usuario
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <p></p>
    </div>
  );
};

export default Dashboard;
