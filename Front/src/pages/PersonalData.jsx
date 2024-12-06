import React, { useState, useEffect } from "react";

const PersonalData = () => {
  const [user, setUser] = useState({
    dni: "",
    name: "",
    apellidos: "",
    telefono_fijo: "",
    telefono_movil: "",
    direccion: "",
    email: "",
    provincia: "",
    pais: "",
    rrhh: "false",
  });
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        if (!token) {
          setError("No estás autenticado.");
          return;
        }

        const response = await fetch("http://localhost:8000/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la información del usuario.");
        }

        const data = await response.json();
        setUser({
          id: data.user.id ?? "",
          dni: data.user.dni ?? "",
          name: data.user.name ?? "",
          apellidos: data.user.apellidos ?? "",
          telefono_fijo: data.user.telefono_fijo ?? "",
          telefono_movil: data.user.telefono_movil ?? "",
          direccion: data.user.direccion ?? "",
          email: data.user.email ?? "",
          provincia: data.user.provincia ?? "",
          pais: data.user.pais ?? "",
          rrhh: data.user.rrhh ?? "false",
        }); // Aseguramos valores por defecto
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setError("No estás autenticado.");
        return;
      }

      const response = await fetch(`http://localhost:8000/me/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user), // Envía los datos actualizados
      });

      if (!response.ok) {
        throw new Error("Error al guardar los cambios.");
      }

      const data = await response.json();
      setUser({
        dni: data.user.dni ?? "",
        name: data.user.name ?? "",
        apellidos: data.user.apellidos ?? "",
        telefono_fijo: data.user.telefono_fijo ?? "",
        telefono_movil: data.user.telefono_movil ?? "",
        direccion: data.user.direccion ?? "",
        email: data.user.email ?? "",
        provincia: data.user.provincia ?? "",
        pais: data.user.pais ?? "",
        rrhh: data.user.rrhh ?? "false",
      }); // Aseguramos valores por defecto
      setEditMode(false); // Salir del modo edición
      alert("Tus datos han sido actualizados.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Mis Datos</h2>
        <form style={styles.form}>
          {/* Datos Personales */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Datos Personales</h3>
            <div style={styles.twoColumnGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  value={user.dni}
                  onChange={handleInputChange}
                  style={styles.input}
                  disabled
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
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
                  value={user.apellidos}
                  onChange={handleInputChange}
                  style={styles.input}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contacto</h3>
            <div style={styles.twoColumnGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Teléfono:</label>
                <input
                  type="text"
                  name="telefono_fijo"
                  value={user.telefono_fijo}
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
                  name="telefono_movil"
                  value={user.telefono_movil}
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
                  name="email"
                  value={user.email}
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

          {/* Dirección */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Dirección</h3>
            <div style={styles.twoColumnGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Dirección:</label>
                <input
                  type="text"
                  name="direccion"
                  value={user.direccion}
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
                  value={user.provincia}
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
                  value={user.pais}
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
    gap: "30px",
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
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
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
