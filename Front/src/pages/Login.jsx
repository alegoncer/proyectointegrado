import React from "react";

const Login = ({ onSwitchToRegister }) => {
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Introduzca sus datos para acceder</h2>
        <form style={styles.form}>
          <label style={styles.label}>
            Usuario:
            <input type="text" name="usuario" style={styles.input} />
          </label>
          <label style={styles.label}>
            Contraseña:
            <input type="password" name="contraseña" style={styles.input} />
          </label>
          <div style={styles.buttonContainer}>
            <button style={styles.button} type="submit">
              Entrar
            </button>
            <button
              style={styles.button}
              type="button"
              onClick={onSwitchToRegister}
            >
              Nuevo usuario
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
};

export default Login;
