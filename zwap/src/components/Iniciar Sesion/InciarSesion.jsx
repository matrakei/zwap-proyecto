import './IniciarSesion.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';
import { useState } from 'react';

export function IniciarSesion() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CorreoElectronico: correo,
          Contrasena: contrasena
        }),
      });

      if (res.ok) {
        const data = await res.json();

        alert("Inicio de sesión exitoso ✅");

        // Guardar usuario y token en localStorage
        if (data.usuario) {
          localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/home");
      } else {
        const error = await res.json();
        alert("Error al iniciar sesión: " + (error.message || "Credenciales incorrectas"));
      }
    } catch (error) {
      console.error("Error al conectar:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  const handleRegistrarse = () => {
    navigate("/"); 
  };

  const handleRecuperarCuenta = (e) => {
    e.preventDefault();
    navigate("/recuperarcuenta"); 
  };

  return (
    <div className="registro-container login-page">
      {/* Columna Izquierda - Formulario */}
      <div className="col-izquierda-iniciar">
        <h2>Iniciar Sesión</h2>

        <div className="social-icons">
          <button><img src={googleIcon} alt="Google" /></button>
          <button><img src={microsoftIcon} alt="Microsoft" /></button>
          <button><img src={appleIcon} alt="Apple" /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button
            type="button"
            className="btn-recuperar"
            onClick={handleRecuperarCuenta}
          >
            ¿Olvidaste tu contraseña?
          </button>
          <button type="submit" className="btn-confirmar">Confirmar</button>
        </form>
      </div>

      {/* Columna Derecha - Mensaje */}
      <div className="col-derecha-iniciar">
        <h1>¡Bienvenido!</h1>
        <p>
          Ingrese sus datos personales para usar todas las funciones de la plataforma
        </p>
        <button 
          className="btn-registrarse" 
          onClick={handleRegistrarse}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default IniciarSesion;
