import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setLoading(true);

    try {
      // Validar inputs básicos
      if (!formData.usuario || !formData.contraseña) {
        setError("Todos los campos son obligatorios");
        setLoading(false);
        return;
      }

      // Llamar al backend para iniciar sesión
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.usuario, // Asegúrate de que coincide con tu backend
          password: formData.contraseña,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Usuario autenticado:", data); // Manejar respuesta (almacenar token, redirigir, etc.)
      localStorage.setItem("auth_token", data.token); // Almacena el token
      navigate("/PersonalData");
      // Aquí puedes redirigir al usuario o manejar la sesión
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Introduzca sus datos para acceder</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          {error && <p style={styles.error}>{error}</p>}
          <label style={styles.label}>
            Usuario:
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Contraseña:
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <div style={styles.buttonContainer}>
            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Entrar"}
            </button>
          </div>
          <div style={styles.switchContainer}>
            <p style={styles.switchText} onClick={onSwitchToRegister}>
              ¿No tienes cuenta? Regístrate aquí
            </p>
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
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "10px",
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  buttonContainer: {
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
  },
  switchContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  switchText: {
    fontSize: "0.9rem",
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Login;
