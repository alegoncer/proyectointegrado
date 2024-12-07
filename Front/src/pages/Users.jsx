import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const data = await response.json();
      setUsers(data.data);
      setFilteredUsers(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [users, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/users/${selectedUser.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditClick = (user) => {
    navigate(`/work-entries/${user.id}`);
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre, apellidos o email"
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <div style={styles.tableContainer}>
        {filteredUsers.map((user) => (
          <div style={styles.tableRow} key={user.id}>
            <div style={styles.tableCell}>
              {`${user.name} ${user.apellidos}`}
            </div>
            <div style={styles.tableCell}>{user.provincia}</div>
            <div style={styles.tableCell}>{user.email}</div>
            <div style={styles.tableCellButtons}>
              <button
                onClick={() => handleViewClick(user)}
                style={styles.button}
                title="Ver usuario"
              >
                👁️
              </button>
              <button
                onClick={() => handleEditClick(user)}
                style={styles.button}
                title="Ver Entradas y Salidas"
              >
                📆
              </button>
              <button
                onClick={() => handleDeleteClick(user)}
                style={styles.button}
                title="Eliminar usuario"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para ver detalles del usuario */}
      {showViewModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Detalles del Usuario</h2>
            <p>
              <strong>DNI:</strong> {selectedUser.dni}
            </p>
            <p>
              <strong>Nombre:</strong> {selectedUser.name}{" "}
              {selectedUser.apellidos}
            </p>
            <p>
              <strong>Provincia:</strong> {selectedUser.provincia}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Móvil:</strong> {selectedUser.telefono_movil}
            </p>
            <button
              onClick={() => setShowViewModal(false)}
              style={styles.closeButton}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para confirmar eliminación del usuario */}
      {showDeleteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Confirmar Eliminación</h2>
            <p>
              ¿Estás seguro de que deseas eliminar al usuario{" "}
              <strong>{selectedUser.name}</strong>?
            </p>
            <div style={styles.modalButtons}>
              <button onClick={confirmDelete} style={styles.deleteButton}>
                Eliminar
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={styles.closeButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
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
  searchInput: {
    width: "80%",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    margin: "0 auto",
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  tableCell: {
    flex: 1,
    textAlign: "left",
    padding: "5px 10px",
  },
  tableCellButtons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "transparent",
    color: "#1a1a2e",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
  },
  closeButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#aaa",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  deleteButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
};

export default Users;
