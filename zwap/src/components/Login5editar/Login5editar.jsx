import './Login5editar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login5editar() {
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
    navigate("/login6editar");
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1>{greetings[greetingIndex]}</h1>
        <p>Editá tu información personal para mantenerla actualizada</p>
        <button className="btn-login" onClick={() => navigate("/perfil")}>
          Volver al Perfil
        </button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Editar Perfil</h2>

        <form className="upload-form" onSubmit={handleSubmit}>
          <div
            className="dropzone2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <p>📁 Arrastrá archivos a esta zona</p>
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
            Guardar y Continuar
          </button>
        </form>

        <div className="steps">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`step ${i === 1 ? 'active' : ''}`}
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
