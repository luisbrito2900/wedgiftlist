import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/gifts"); // Cambia esto por la ruta a donde deseas redirigir al usuario
    }
  }, [currentUser, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });
      navigate("/gifts");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo ya se encuentra registrado.");
      } else {
        setError("Ocurrió un error al intentar registrar el usuario.");
      }
      console.error("Error en el registro:", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
          required
        />
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
      {error && <p className="error-message">{error}</p>}
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
