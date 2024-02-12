import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GiftList from "./components/GiftList";
import Register from "./components/Register"; // Cambiado de GuestRegister a Register
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext"; // Asegúrate de que la ruta sea correcta
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <header className="App-header">
            <h1 data-testid="pageTitle">Lista de regalos de boda</h1>
            <nav>
              <Link to="/register">Registrarse</Link> |{" "}
              <Link to="/login">Iniciar sesión</Link>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<GiftList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Agrega más rutas según sea necesario */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
