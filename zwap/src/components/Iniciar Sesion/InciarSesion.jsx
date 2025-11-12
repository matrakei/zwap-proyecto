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
      // 🔹 Enviamos los datos de login al backend local
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CorreoElectronico: correo.trim(),
          Contrasena: contrasena,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Correo o contraseña incorrectos ❌");
          return;
        }
        throw new Error("Error al iniciar sesión");
      }

      // 🔹 Si el login fue exitoso
      const data = await res.json();
      const usuario = data.usuario;

      // 💾 Guardamos el usuario logueado en localStorage
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

      alert("Inicio de sesión exitoso ✅");
      navigate("/home");

    } catch (error) {
      console.error("❌ Error al conectar con el servidor local:", error);
      alert("No se pudo conectar con el servidor local. Asegurate de que el backend esté corriendo.");
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
      {/* 🟦 Columna Izquierda - Formulario */}
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
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
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

      {/* ⚪ Columna Derecha - Mensaje */}
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
