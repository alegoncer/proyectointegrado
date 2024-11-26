import React, { useState, useEffect } from "react";

const PersonalData = () => {
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
          {/* Sección 1: Datos personales */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Datos Personales</h3>
            <div style={styles.twoColumnGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={datos.dni}
                  onChange={handleInputChange}
                  style={styles.input}
                  disabled
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={datos.nombre}
                  onChange={handleInputChange}
                  style={styles.input}
                  disabled
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Apellidos:</label>
                <input
                  type="text"
                  name="apellidos"
                  value={datos.apellidos}
                  onChange={handleInputChange}
                  style={styles.input}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Sección 2: Contacto */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contacto</h3>
            <div style={styles.twoColumnGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Teléfono:</label>
                <input
                  type="text"
                  name="telefono"
                  value={datos.telefono}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    backgroundColor: editMode ? "#fff" : "#f0f0f0",
                  }}
                  disabled={!editMode}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Móvil:</label>
                <input
                  type="text"
                  name="movil"
                  value={datos.movil}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    backgroundColor: editMode ? "#fff" : "#f0f0f0",
                  }}
                  disabled={!editMode}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  name="mail"
                  value={datos.mail}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    backgroundColor: editMode ? "#fff" : "#f0f0f0",
                  }}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          {/* Sección 3: Dirección */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Dirección</h3>
            <div style={styles.twoColumnGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Dirección:</label>
                <input
                  type="text"
                  name="direccion"
                  value={datos.direccion}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    backgroundColor: editMode ? "#fff" : "#f0f0f0",
                  }}
                  disabled={!editMode}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Provincia:</label>
                <input
                  type="text"
                  name="provincia"
                  value={datos.provincia}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    backgroundColor: editMode ? "#fff" : "#f0f0f0",
                  }}
                  disabled={!editMode}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>País:</label>
                <input
                  type="text"
                  name="pais"
                  value={datos.pais}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    backgroundColor: editMode ? "#fff" : "#f0f0f0",
                  }}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
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
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    textAlign: "center",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    color: "#1a1a2e",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    marginBottom: "15px",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#1a1a2e",
    marginBottom: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px", // Espacio reducido entre columnas
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    fontSize: "16px",
    color: "#1a1a2e",
    textAlign: "left",
    fontWeight: "500",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px", // Espaciado reducido
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px", // Tamaño de texto reducido
    fontFamily: "'Roboto', sans-serif",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
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

export default PersonalData;
