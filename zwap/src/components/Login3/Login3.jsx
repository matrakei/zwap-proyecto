import './Login3.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';

export function Login3() {
  const navigate = useNavigate();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = ["¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!", "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"];

  // Estado para manejar inputs de este paso
  const [formData, setFormData] = useState({
    Estado: "",
    Ciudad: "",
    FechaNacimiento: "",
    Descripcion: ""
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

    // Traigo lo que se guardó antes
    const datosPrevios = JSON.parse(localStorage.getItem("registroUsuario")) || {};

    // Guardo lo nuevo sumado
    localStorage.setItem("registroUsuario", JSON.stringify({
      ...datosPrevios,
      ...formData
    }));

    navigate("/login4"); 
  };

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate("/iniciarsesion"); 
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
            name="Estado"
            placeholder="Estado"
            value={formData.Estado}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Ciudad"
            placeholder="Ciudad"
            value={formData.Ciudad}
            onChange={handleChange}
          />
          <input
            type="text"
            name="FechaNacimiento"
            placeholder="Fecha de nacimiento"
            value={formData.FechaNacimiento}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Descripcion"
            placeholder="Descripcón(Opcional)"
            value={formData.Descripcion}
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
