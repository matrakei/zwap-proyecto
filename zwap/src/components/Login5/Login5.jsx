import './Login5.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';

export function Login5() {
  const [files, setFiles] = useState([]);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosPrevios = JSON.parse(localStorage.getItem("registroUsuario")) || {};
    localStorage.setItem("registroUsuario", JSON.stringify({
      ...datosPrevios,
      Archivos: files.map((file) => file.name)
    }));

    navigate("/login6");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/iniciarsesion");
  };

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

        {/* DROPZONE */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <p>📁 Arrastra tus archivos aquí</p>
            <input
              type="file"
              accept=".jpg,.png"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="upload-button">
              Seleccionar archivo desde el ordenador
            </label>
          </div>

          <ul className="file-list">
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>

          <button type="submit" className="login-next">
            Confirmar
          </button>
        </form>

        {/* STEPS */}
        <div className="login-steps">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`login-step ${i < 1 ? 'done' : ''} ${i === 1 ? 'active' : ''}`}
            >
              <div className="login-circle">{i < 1 ? '✓' : ''}</div>
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
