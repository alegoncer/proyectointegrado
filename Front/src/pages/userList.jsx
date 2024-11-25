import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizar la solicitud para obtener los usuarios
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users"); // URL completa al backend
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        setUsers(data.data); // Extraer la lista de usuarios del JSON
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lista de Usuarios</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Correo Electrónico</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styles.td}>{user.id}</td>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default UserList;
