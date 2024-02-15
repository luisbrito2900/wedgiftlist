import { Link } from "react-router-dom";
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/gifts");
    }
  }, [currentUser, navigate]);

  return (
    <div className="home-container">
      <h1>Bienvenido a la selección de regalos de boda</h1>
      <p>
        Por favor, procede a registrarte o a iniciar sesión si ya cuentas con un
        usuario.
      </p>
      <div className="home-actions">
        <Link to="/register" className="btn btn-primary">
          Registrarse
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
