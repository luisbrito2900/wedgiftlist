import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/gifts");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo ya se encuentra registrado.");
      } else {
        setError("Ocurrió un error al intentar registrar el usuario."); // Manejo de otros errores
      }
      console.error("Error en el registro:", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
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
          Registrarse
        </button>
      </form>
      {error && <p className="error-message">{error}</p>} {}
      <div className="link-container">
        <Link to="/homePage" className="form-link">
          Volver a la página principal
        </Link>
        <Link to="/login" className="form-link">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default Register;
