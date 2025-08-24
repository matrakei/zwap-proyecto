import './Login4.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';

export function Login4() {
  const navigate = useNavigate();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = ["¡Hola!", "Hello!", "Bonjour!", "Ciao!", "Hallo!", "Olá!", "Привет!", "こんにちは", "مرحبا", "你好"];

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // evita que se recargue la página
    navigate("/login5"); // te lleva a Login5
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1>{greetings[greetingIndex]}</h1>
        <p>
          Regístrese con sus datos personales para usar todas las funciones de
          la plataforma
        </p>
        <button className="btn-login">Iniciar Sesión</button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Registrarse</h2>

        <div className="social-icons">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        <form className="Formulario" onSubmit={handleSubmit}>
          <label>
            Tipo de Documento
            <select className="DNI">
              <option>DNI</option>
              <option>Cédula de identidad</option>
              <option>National Identity Card</option>
              <option>Carte Nationale d'Identité</option>
              <option>Personalausweis</option>
            </select>
          </label>
          <input type="text" placeholder="Numero de Documento" />
          <button type="submit" className="btn-siguiente">
            Siguiente
          </button>
        </form>

        <div className="steps">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`step ${i < 1 ? 'done' : ''} ${i === 1 ? 'active' : ''}`}
            >
              <div className="circle">{i < 1 ? '✓' : ''}</div>
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
