import { useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClockIn from "./pages/clockIn";
import Absence from "./pages/Absence";
import PersonalData from "./pages/PersonalData";
import UserList from "./pages/Users";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSwitchToRegister = () => setIsNewUser(true);
  const handleSwitchToLogin = () => setIsNewUser(false);

  return (
    <Routes>
      {/* <Route
        path="/"
        element={
          isNewUser ? (
            <Register onSwitchToLogin={handleSwitchToLogin} />
          ) : (
            <Login onSwitchToRegister={handleSwitchToRegister} />
          )
        }
      /> */}
      <Route path="/" element={<Login />} />
      <Route path="/ClockIn" element={<ClockIn />} />
      <Route path="/Absence" element={<Absence />} />
      <Route path="/PersonalData" element={<PersonalData />} />
      <Route path="/Users" element={<UserList />} />{" "}
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

export default App;
