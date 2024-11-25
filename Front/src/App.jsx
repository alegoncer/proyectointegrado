import { useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Importa el nuevo componente Register
import Fichar from "./pages/Fichar";
import Justificantes from "./pages/Justificantes";
import Datos from "./pages/Datos";
import UserList from "./pages/UserList"; // Importa el componente UserList

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  // Estado para alternar entre Login y Register en la ruta "/"
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSwitchToRegister = () => setIsNewUser(true);
  const handleSwitchToLogin = () => setIsNewUser(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isNewUser ? (
            <Register onSwitchToLogin={handleSwitchToLogin} />
          ) : (
            <Login onSwitchToRegister={handleSwitchToRegister} />
          )
        }
      />
      <Route path="/fichar" element={<Fichar />} />
      <Route path="/justificantes" element={<Justificantes />} />
      <Route path="/datos" element={<Datos />} />
      <Route path="/users" element={<UserList />} />{" "}
      <Route path="/register" element={<Register />} />
      {/* Ruta para lista de usuarios */}
    </Routes>
  );
}

export default App;
