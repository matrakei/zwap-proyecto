import './IniciarSesion.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';
import { useState, useEffect } from 'react';

export function IniciarSesion() {
  const navigate = useNavigate();
  const [saludoIndex, setSaludoIndex] = useState(0);

  const saludos = ["¡Hola!", "Hello!", "Bonjour!", "Hallo!", "Ciao!", "Olá!", "Привет!", "こんにちは!", "안녕하세요!", "مرحبا!"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSaludoIndex((prev) => (prev + 1) % saludos.length);
    }, 2000); // cambia cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return ( 
    <div className="registro-container1">
      {/* Columna Izquierda (Formulario de login) */}
      <div className="col-izquierda">
        <h2>Iniciar Sesión</h2>
        <div className="social-icons">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
          <button type="submit" className="btn-siguiente">
            Confirmar
          </button>
        </form>
      </div>

      {/* Columna Derecha (Bienvenida con círculo) */}
      <div className="col-derecha1">
        <h1>{saludos[saludoIndex]}</h1>
        <p>
          Ingrese sus datos personales para usar todas las funciones de la plataforma
        </p>
        <button className="btn-login">Registrarse</button>
      </div>
    </div>
  );
}
