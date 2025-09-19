import './Login.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';
import { useState, useEffect } from 'react';

export function Login() {
  const navigate = useNavigate();
  const [saludoIndex, setSaludoIndex] = useState(0);

  const saludos = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    Nombre: "",
    NombreUsuario: "",
    CorreoElectronico: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSaludoIndex((prev) => (prev + 1) % saludos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar datos al back
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Usuario creado con éxito");
        navigate("/login2");
      } else {
        const errorData = await res.json();
        alert("Error: " + (errorData.message || "No se pudo crear el usuario"));
      }
    } catch (error) {
      console.error("Error al conectar con el back:", error);
      alert("No se pudo conectar al servidor.");
    }
  };

  const handleLogin = () => {
    navigate("/iniciarsesion");
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1>{saludos[saludoIndex]}</h1>
        <p>
          Regístrese con sus datos personales para usar todas las funciones de
          la plataforma
        </p>
        <button className="btn-login" onClick={handleLogin}>Iniciar Sesión</button>
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
            name="Nombre"
            placeholder="Nombre Completo"
            value={formData.Nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="NombreUsuario"
            placeholder="Nombre de usuario"
            value={formData.NombreUsuario}
            onChange={handleChange}
          />
          <input
            type="text"
            name="CorreoElectronico"
            placeholder="Correo electrónico"
            value={formData.CorreoElectronico}
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
