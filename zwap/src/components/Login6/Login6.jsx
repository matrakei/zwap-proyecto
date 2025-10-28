import './Login6.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';
import { useState, useEffect } from 'react';

export function Login6() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const datosPrevios = JSON.parse(localStorage.getItem("registroUsuario")) || {};

    const usuario = {
      Nombre: datosPrevios.Nombre || "",
      Apellido: datosPrevios.Apellido || "ApellidoTest",
      Dni: datosPrevios.NumeroDocumento || "00000000",
      CorreoElectronico: datosPrevios.CorreoElectronico || "",
      NumeroTelefono: datosPrevios.NumeroTelefono || "",
      Nacionalidad: datosPrevios.Nacionalidad || "",
      Pais: datosPrevios.PaisResidencia || datosPrevios.Pais || "",
      ProvinciaEstado: datosPrevios.Estado || "",
      Ciudad: datosPrevios.Ciudad || "",
      Direccion: datosPrevios.Direccion || "Dirección pendiente",
      Contrasena: password
    };

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const creado = await response.json().catch(() => ({}));
        const usuarioGuardado = creado?.usuario || usuario;
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioGuardado));
        localStorage.removeItem("registroUsuario");
        alert("Usuario registrado con éxito 🎉");
        navigate("/home");
      } else {
        const error = await response.json();
        alert("Error al registrar usuario: " + (error.message || "Intenta nuevamente"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/iniciarsesion");
  };

  const mensajes = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % mensajes.length);
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="login-container">
      {/* COLUMNA IZQUIERDA */}
      <div className="login-left">
        <h1>{mensajes[indice]}</h1>
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

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="login-next">
            Confirmar
          </button>
        </form>

        {/* STEPS */}
        <div className="login-steps">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`login-step ${i < 2 ? 'done' : ''} ${i === 2 ? 'active' : ''}`}
            >
              <div className="login-circle">{i < 2 ? '✓' : ''}</div>
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
