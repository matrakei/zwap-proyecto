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
      // ✅ Obtenemos todos los usuarios desde el backend local
      const res = await fetch("http://localhost:3001/api/usuarios");
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const usuarios = await res.json();

      // 🔍 Buscamos el usuario que coincida con el correo
      const usuario = usuarios.find(
        (u) => u.CorreoElectronico === correo
      );

      if (!usuario) {
        alert("No se encontró un usuario con ese correo electrónico.");
        return;
      }

      // 🔐 Comprobamos la contraseña
      if (usuario.Contrasena !== contrasena) {
        alert("Contraseña incorrecta.");
        return;
      }

      // 💾 Guardamos el usuario en localStorage
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      alert("Inicio de sesión exitoso ✅");

      navigate("/home");
    } catch (error) {
      console.error("Error al conectar con el servidor local:", error);
      alert("No se pudo conectar con el servidor local. ¿Está corriendo el backend?");
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
