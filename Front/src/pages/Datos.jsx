import React, { useState, useEffect } from "react";

const Datos = () => {
  const [datos, setDatos] = useState({
    dni: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    movil: "",
    mail: "",
    direccion: "",
    pais: "",
    provincia: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = {
        dni: "12345678A",
        nombre: "Juan",
        apellidos: "Pérez García",
        telefono: "912345678",
        movil: "612345678",
        mail: "juan.perez@example.com",
        direccion: "Calle Falsa 123",
        pais: "España",
        provincia: "Madrid",
      };
      setDatos(userData);
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Datos actualizados:", datos);
    alert("Tus datos han sido actualizados.");
  };

  const noEditableFields = ["dni", "nombre", "apellidos"];

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Mis Datos</h2>
        <form style={styles.form}>
          {Object.keys(datos).map((key) => (
            <label key={key} style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <input
                type="text"
                name={key}
                value={datos[key]}
                onChange={handleInputChange}
                style={{
                  ...styles.input,
                  backgroundColor:
                    editMode && !noEditableFields.includes(key)
                      ? "#fff"
                      : "#f0f0f0",
                }}
                disabled={!editMode || noEditableFields.includes(key)}
              />
            </label>
          ))}
        </form>
        <div style={styles.buttonContainer}>
          {editMode ? (
            <button style={styles.button} onClick={handleSave}>
              Guardar Cambios
            </button>
          ) : (
            <button style={styles.button} onClick={() => setEditMode(true)}>
              Editar Datos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    textAlign: "center",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "90%",
  },
  title: {
    textAlign: "center", // Centra el título
    fontSize: "24px",
    color: "#1a1a2e",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "16px",
    color: "#1a1a2e",
    textAlign: "left",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    fontFamily: "'Roboto', sans-serif",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#1a1a2e",
    color: "white",
    fontFamily: "'Roboto', sans-serif",
    transition: "background-color 0.3s",
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

export default Datos;
