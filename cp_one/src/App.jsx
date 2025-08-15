import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home.jsx";
import Areas from "./components/Areas.jsx";
import Register from "./components/Register.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
            <Route path="/areas" element={<Areas />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
