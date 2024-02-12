import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const GuestRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Registro exitoso, puedes redirigir o manejar el estado global de autenticación
      navigate("/"); // Redirige a la página principal o a donde consideres apropiado
    } catch (error) {
      console.error("Error en el registro:", error.message);
      // Maneja el error mostrando un mensaje al usuario
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default GuestRegister;
