import React, { useState, useEffect } from "react";

const Register = ({ onSwitchToLogin }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "", // Cambiado de username a name
    email: "",
    password: "",
  });

  const [csrfToken, setCsrfToken] = useState(null);

  // Captura del CSRF token al montar el componente
  useEffect(() => {
    const token = document.querySelector('meta[name="csrf-token"]')?.content;
    setCsrfToken(token);

    if (!token) {
      console.error("CSRF Token no encontrado. Revisa tu configuración.");
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePasswords(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswords(password, e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errorMessage && password === confirmPassword) {
      try {
        const response = await fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken, // Token CSRF capturado
          },
          body: JSON.stringify({
            name: formData.name, // Cambiado de username a name
            email: formData.email,
            password: password,
          }),
        });

        console.log("Estado de la respuesta:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error desconocido");
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        setSuccessMessage("Usuario creado con éxito.");
        setFormData({ name: "", email: "", password: "" });
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error en el fetch:", error.message);
        setErrorMessage("Error al conectarse con el servidor.");
      }
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    password &&
    confirmPassword &&
    !errorMessage;

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Crea tu cuenta nueva</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>
            Nombre de usuario:
            <input
              type="text"
              name="name" // Cambiado de username a name
              style={styles.input}
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label style={styles.label}>
            Correo electrónico:
            <input
              type="email"
              name="email"
              style={styles.input}
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label style={styles.label}>
            Contraseña:
            <input
              type="password"
              name="password"
              style={styles.input}
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <label style={styles.label}>
            Verificar contraseña:
            <input
              type="password"
              name="confirmPassword"
              style={styles.input}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          {errorMessage && <p style={styles.error}>{errorMessage}</p>}
          {successMessage && <p style={styles.success}>{successMessage}</p>}
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              type="button"
              onClick={onSwitchToLogin}
            >
              Regresar
            </button>
            <button
              style={{
                ...styles.button,
                backgroundColor: isFormValid ? "#1a1a2e" : "#ccc",
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
              type="submit"
              disabled={!isFormValid}
            >
              Crear nuevo usuario
            </button>
          </div>
        </form>
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
  formContainer: {
    textAlign: "center",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
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
    gap: "10px",
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
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "-10px",
  },
  success: {
    color: "green",
    fontSize: "14px",
    marginTop: "-10px",
  },
};

export default Register;