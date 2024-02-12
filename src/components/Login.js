import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/gifts");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit" className="form-button">
          Iniciar sesión
        </button>
      </form>
      <div className="link-container">
        <Link to="/homePage" className="form-link">
          Volver a la página principal
        </Link>
        <Link to="/register" className="form-link">
          ¿No tienes cuenta? Registrate
        </Link>
      </div>
    </div>
  );
};

export default Login;
