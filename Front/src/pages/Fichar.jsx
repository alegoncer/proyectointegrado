import React, { useState, useEffect } from "react";

const Fichar = () => {
  const [time, setTime] = useState(new Date());
  const [entrada, setEntrada] = useState(null);
  const [salida, setSalida] = useState(null);

  // Actualizar el reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  // Funciones para manejar los botones
  const handleEntrada = () => {
    setEntrada(time.toLocaleTimeString("es-ES", { hour12: false }));
  };

  const handleSalida = () => {
    setSalida(time.toLocaleTimeString("es-ES", { hour12: false }));
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
        <div style={styles.recordsContainer}>
          {entrada && (
            <p style={styles.record}>
              <strong>Entrada:</strong> {entrada}
            </p>
          )}
          {salida && (
            <p style={styles.record}>
              <strong>Salida:</strong> {salida}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
  recordsContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  record: {
    fontSize: "16px",
    color: "#1a1a2e",
  },
};

// Add hover effects for buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#e94560";
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "#1a1a2e";
    });
  });
});

export default Fichar;
