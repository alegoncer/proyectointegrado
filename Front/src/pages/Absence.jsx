import React, { useState } from "react";

const Absence = () => {
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [incidencia, setIncidencia] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      alert("El archivo no debe superar los 10 MB");
      return;
    }
    setArchivo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!inicio || !fin || !incidencia) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setError("No estás autenticado.");
        return;
      }

      const formData = new FormData();
      formData.append("start_date", inicio);
      formData.append("end_date", fin);
      formData.append("type", incidencia);
      formData.append("observations", observaciones);
      console.log(formData);
      if (archivo) formData.append("file", archivo);

      const response = await fetch("http://localhost:8000/absences", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Token de autenticación
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Error al registrar el justificante."
        );
      }

      const data = await response.json();
      console.log(data);
      setSuccess("Justificante registrado con éxito.");
      setInicio("");
      setFin("");
      setIncidencia("");
      setObservaciones("");
      setArchivo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Registrar Justificante</h2>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", marginBottom: "10px" }}>{success}</p>
        )}
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.dateContainer}>
            <label style={styles.dateLabel}>
              Fecha de inicio:
              <input
                type="date"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                style={styles.dateInput}
              />
            </label>
            <label style={styles.dateLabel}>
              Fecha de fin:
              <input
                type="date"
                value={fin}
                onChange={(e) => setFin(e.target.value)}
                style={styles.dateInput}
              />
            </label>
          </div>
          <label style={styles.label}>
            Tipo de incidencia:
            <select
              value={incidencia}
              onChange={(e) => setIncidencia(e.target.value)}
              style={styles.input}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="trabajo">Trabajo</option>
              <option value="personal">Personal</option>
              <option value="medico">Médico</option>
              <option value="otros">Otros</option>
            </select>
          </label>
          <label style={styles.label}>
            Observaciones:
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              style={{ ...styles.input, height: "100px", resize: "none" }}
            ></textarea>
          </label>
          <label style={styles.label}>
            Adjuntar archivo (imagen o PDF, máx. 10 MB):
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleArchivoChange}
              style={styles.input}
            />
          </label>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Enviar Justificante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Roboto', sans-serif",
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
    fontSize: "24px",
    color: "#1a1a2e",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  dateLabel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    fontSize: "16px",
    color: "#1a1a2e",
    fontWeight: "500",
    textAlign: "left",
  },
  dateInput: {
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    fontFamily: "'Roboto', sans-serif",
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

export default Absence;
