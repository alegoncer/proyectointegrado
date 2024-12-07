import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const WorkEntries = () => {
  const { userId } = useParams(); // Obtén el userId de los parámetros de la URL
  const [userName, setUserName] = useState(""); // Nuevo estado para almacenar el nombre del usuario
  const [workEntries, setWorkEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar los datos del usuario y sus entradas/salidas
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        if (!token) {
          setError("No estás autenticado.");
          setLoading(false);
          return;
        }

        // Solicitar los datos del usuario
        const userResponse = await fetch(
          `http://localhost:8000/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }

        const userData = await userResponse.json();
        setUserName(
          `${userData.name || userData.first_name} ${
            userData.apellidos || userData.last_name
          }`
        );

        // Solicitar las entradas/salidas del usuario
        const entriesResponse = await fetch(
          `http://localhost:8000/work-entries/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!entriesResponse.ok) {
          throw new Error("Error al obtener los registros.");
        }

        const entriesData = await entriesResponse.json();
        setWorkEntries(entriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Cargando registros...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Entradas y Salidas de {userName}</h1>
      {workEntries.length === 0 ? (
        <p style={styles.noData}>No hay registros disponibles.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Fecha</th>
              <th style={styles.tableHeader}>Entrada</th>
              <th style={styles.tableHeader}>Salida</th>
            </tr>
          </thead>
          <tbody>
            {workEntries.map((entry) => (
              <tr key={entry.id}>
                <td style={styles.tableCell}>{entry.work_date}</td>
                <td style={styles.tableCell}>{entry.start_time || "N/A"}</td>
                <td style={styles.tableCell}>{entry.end_time || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  noData: {
    fontSize: "1.2rem",
    color: "#555",
  },
  table: {
    width: "80%",
    margin: "0 auto",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#1a1a2e",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  tableCell: {
    borderBottom: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
  },
};

export default WorkEntries;
