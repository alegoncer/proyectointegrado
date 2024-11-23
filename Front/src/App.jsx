import { useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Fichar from "./pages/Fichar";
import Justificantes from "./pages/Justificantes";
import Datos from "./pages/Datos";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/fichar" element={<Fichar />} />
      <Route path="/justificantes" element={<Justificantes />} />
      <Route path="/datos" element={<Datos />} />
    </Routes>
  );
}

export default App;
