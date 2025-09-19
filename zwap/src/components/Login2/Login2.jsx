import './Login2.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';
import { useState, useEffect } from 'react';

export function Login2() {
  const navigate = useNavigate();
  const [saludoIndex, setSaludoIndex] = useState(0);

  const saludos = ["¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!", "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"];

  // Estado para guardar inputs
  const [formData, setFormData] = useState({
    CodigoPais: "",
    NumeroTelefono: "",
    Nacionalidad: "",
    PaisResidencia: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSaludoIndex((prev) => (prev + 1) % saludos.length);
    }, 2000); // cambia cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Traigo datos guardados del paso anterior (Login.jsx)
    const datosPrevios = JSON.parse(localStorage.getItem("registroUsuario")) || {};

    // Guardo todo en localStorage (se va acumulando paso a paso)
    localStorage.setItem("registroUsuario", JSON.stringify({
      ...datosPrevios,
      ...formData
    }));

    navigate("/login3");
  };

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate("/iniciarsesion"); 
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1 className="saludo-animado">{saludos[saludoIndex]}</h1>
        <p>
          Regístrese con sus datos personales para usar todas las funciones de
          la plataforma
        </p>
        <button className="btn-login" onClick={handleLogin} >Iniciar Sesión</button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Registrarse</h2>
        <div className="social-icons">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="CodigoPais"
            placeholder="Codigo de pais"
            value={formData.CodigoPais}
            onChange={handleChange}
          />
          <input
            type="text"
            name="NumeroTelefono"
            placeholder="Número de telefono"
            value={formData.NumeroTelefono}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Nacionalidad"
            placeholder="Nacionalidad"
            value={formData.Nacionalidad}
            onChange={handleChange}
          />
          <input
            type="text"
            name="PaisResidencia"
            placeholder="Pais de residencia"
            value={formData.PaisResidencia}
            onChange={handleChange}
          />
          <button type="submit" className="btn-siguiente">
            Siguiente
          </button>
        </form>

        <div className="steps">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`step ${i === 0 ? 'active' : ''}`}>
              <div className="circle" />
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
