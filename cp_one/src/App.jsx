import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home.jsx";
import Areas from "./components/Areas.jsx";
import Register from "./components/Register.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
