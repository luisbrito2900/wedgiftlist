import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom"; // Asumiendo que estás usando react-router para la navegación

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Sesión iniciada con:", userCredential.user);
      // Aquí puedes redirigir al usuario o manejar el estado de autenticación como prefieras
    } catch (error) {
      console.error("Error en el inicio de sesión:", error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>
        No tienes una cuenta? <Link to="/register">Registrarse</Link>
      </p>
    </div>
  );
};

export default Login;
