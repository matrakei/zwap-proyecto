import './Login5.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';

export function Login5() {
  const [files, setFiles] = useState([]);
  const [previewBase64, setPreviewBase64] = useState(null);

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

  // Convertir archivos a Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);

    // Convertir la PRIMERA foto
    const base64 = await fileToBase64(droppedFiles[0]);
    setPreviewBase64(base64);
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const base64 = await fileToBase64(selectedFiles[0]);
    setPreviewBase64(base64);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosPrevios = JSON.parse(localStorage.getItem("registroUsuario")) || {};

    localStorage.setItem(
      "registroUsuario",
      JSON.stringify({
        ...datosPrevios,
        FotoPerfil: previewBase64 || null
      })
    );

    navigate("/login6");
  };

  const handleLogin = () => {
    navigate("/iniciarsesion");
  };

  return (
    <div className="login-container">
      {/* IZQUIERDA */}
      <div className="login-left">
        <h1>{greetings[greetingIndex]}</h1>
        <p>Regístrese con sus datos personales para usar todas las funciones</p>
        <button className="login-btn" onClick={handleLogin}>Iniciar Sesión</button>
      </div>

      {/* DERECHA */}
      <div className="login-right">
        <h2>Registrarse</h2>

        <div className="login-social">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <p>📁 Arrastra tu foto aquí</p>

            <input
              type="file"
              accept=".jpg,.png"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="upload-button">
              Seleccionar archivo
            </label>
          </div>

          {/* Preview de la imagen */}
          {previewBase64 && (
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <img
                src={previewBase64}
                alt="preview"
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              />
            </div>
          )}

          <button type="submit" className="login-next">
            Confirmar
          </button>
        </form>

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
