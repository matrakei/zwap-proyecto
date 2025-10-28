import './Login2.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';
import { useState, useEffect } from 'react';

export function Login2() {
  const navigate = useNavigate();
  const [saludoIndex, setSaludoIndex] = useState(0);

  const saludos = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];

  const [formData, setFormData] = useState({
    CodigoPais: "",
    NumeroTelefono: "",
    Nacionalidad: "",
    PaisResidencia: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSaludoIndex((prev) => (prev + 1) % saludos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosPrevios = JSON.parse(localStorage.getItem("registroUsuario")) || {};
    localStorage.setItem("registroUsuario", JSON.stringify({
      ...datosPrevios,
      ...formData
    }));
    navigate("/login3");
  };

  const handleLogin = () => navigate("/iniciarsesion");

  return (
    <div className="login-container">
      {/* Columna Izquierda */}
      <div className="login-left">
        <h1>{saludos[saludoIndex]}</h1>
        <p>Regístrese con sus datos personales para usar todas las funciones de la plataforma</p>
        <button className="login-btn" onClick={handleLogin}>Iniciar Sesión</button>
      </div>

      {/* Columna Derecha */}
      <div className="login-right">
        <h2>Registrarse</h2>

        <div className="login-social">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="CodigoPais"
            placeholder="Código de país"
            value={formData.CodigoPais}
            onChange={handleChange}
          />
          <input
            type="text"
            name="NumeroTelefono"
            placeholder="Número de teléfono"
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
            placeholder="País de residencia"
            value={formData.PaisResidencia}
            onChange={handleChange}
          />
          <button type="submit" className="login-next">Siguiente</button>
        </form>

        <div className="login-steps">
           {[...Array(3)].map((_, i) => (
            <div key={i} className={`login-step ${i === 0 ? 'active' : ''}`}>
             <div className="login-circle" />
             <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
