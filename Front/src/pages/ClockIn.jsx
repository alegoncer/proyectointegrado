import React, { useState, useEffect } from "react";

const ClockIn = () => {
  const [time, setTime] = useState(new Date());
  const [workEntries, setWorkEntries] = useState([]);
  const [error, setError] = useState("");

  // Actualizar el reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  // Cargar registros del usuario logueado
  useEffect(() => {
    const fetchWorkEntries = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Recupera el token almacenado

        if (!token) {
          setError("No estás autenticado.");
          return;
        }

        const response = await fetch("http://localhost:8000/work-entries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los registros.");
        }

        const data = await response.json();
        setWorkEntries(data); // Almacena los registros del usuario
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWorkEntries();
  }, []);

  // Manejar la entrada
  const handleEntrada = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setError("No estás autenticado.");
        return;
      }

      const response = await fetch("http://localhost:8000/work-entry/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar la entrada.");
      }

      const data = await response.json();
      alert("Hora de entrada registrada con éxito.");
      setWorkEntries((prevEntries) => [data.work_entry, ...prevEntries]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Manejar la salida
  const handleSalida = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setError("No estás autenticado.");
        return;
      }

      const response = await fetch("http://localhost:8000/work-entry/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar la salida.");
      }

      const data = await response.json();
      alert("Hora de salida registrada con éxito.");
      setWorkEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === data.work_entry.id ? data.work_entry : entry
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.clockContainer}>
        <h1 style={styles.clock}>
          {time.toLocaleTimeString("es-ES", { hour12: false })}
        </h1>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleEntrada}>
            Entrada
          </button>
          <button style={styles.button} onClick={handleSalida}>
            Salida
          </button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.tableContainer}>
          <h3 style={styles.tableTitle}>Historial de Entradas y Salidas</h3>
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
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Roboto', sans-serif",
  },
  clockContainer: {
    textAlign: "center",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "800px",
  },
  clock: {
    fontSize: "48px",
    color: "#1a1a2e",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#1a1a2e",
    color: "white",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  tableContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  tableTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#1a1a2e",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  tableCell: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
  },
};

export default ClockIn;
