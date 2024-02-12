import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom"; // Asumiendo que estás usando react-router para la navegación

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Registrado:", userCredential.user);
      // Aquí puedes redirigir al usuario o manejar el estado de autenticación como prefieras
    } catch (error) {
      console.error("Error en el registro:", error.message);
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
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
      <p>
        Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
