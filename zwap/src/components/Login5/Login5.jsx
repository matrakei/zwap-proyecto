import './Login5.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';

export function Login5() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

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
    navigate("/login6");
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1>¡Hola!</h1>
        <p>
          Regístrese con sus datos personales para usar todas las funciones de
          la plataforma
        </p>
        <button className="btn-login">Iniciar Sesión</button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Registrarse</h2>

        <div className="social-icons">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        {/* Dropzone de archivos */}
        <form className="upload-form" onSubmit={handleSubmit}>
          <div
            className="dropzone2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <p>📁 Arrastra archivos a esta zona</p>
            <input
              type="file"
              accept=".jpg,.png"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="upload-button">
              Seleccionar archivo desde mi ordenador
            </label>
          </div>

          <ul className="file-list">
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>

          <button type="submit" className="btn-siguiente">
            Confirmar
          </button>
        </form>

        <div className="steps">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`step ${i < 1 ? 'done' : ''} ${i === 1 ? 'active' : ''}`}
            >
              <div className="circle">{i < 1 ? '✓' : ''}</div>
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
