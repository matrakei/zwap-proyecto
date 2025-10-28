import './Login4.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';

export function Login4() {
  const navigate = useNavigate();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];

  const [formData, setFormData] = useState({
    TipoDocumento: "DNI",
    NumeroDocumento: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
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
    navigate("/login5");
  };

  const handleLogin = () => navigate("/iniciarsesion");

  return (
    <div className="login-container">
      {/* COLUMNA IZQUIERDA */}
      <div className="login-left">
        <h1>{greetings[greetingIndex]}</h1>
        <p>Regístrese con sus datos personales para usar todas las funciones de la plataforma</p>
        <button className="login-btn" onClick={handleLogin}>Iniciar Sesión</button>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="login-right">
        <h2>Registrarse</h2>

        <div className="login-social">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Tipo de Documento
            <select
              name="TipoDocumento"
              value={formData.TipoDocumento}
              onChange={handleChange}
              className="login-select"
            >
              <option>DNI</option>
              <option>Cédula de identidad</option>
              <option>National Identity Card</option>
              <option>Carte Nationale d'Identité</option>
              <option>Personalausweis</option>
            </select>
          </label>

          <input
            type="text"
            name="NumeroDocumento"
            placeholder="Número de documento"
            value={formData.NumeroDocumento}
            onChange={handleChange}
          />

          <button type="submit" className="login-next">
            Siguiente
          </button>
        </form>


        <div className="login-steps">
         {[...Array(3)].map((_, i) => (
           <div key={i} className={`login-step ${i < 1 ? 'done' : ''} ${i === 1 ? 'active' : ''}`}>
           <div className="login-circle">{i < 1 ? '✓' : ''}</div>
           <span>Step {i + 1}</span>
          </div>
         ))}
        </div>

      </div>
    </div>
  );
}
