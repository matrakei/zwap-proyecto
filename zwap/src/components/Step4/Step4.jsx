import './Step4.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step4() {
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

  const handleSubmit = () => {
    navigate('/perfil/step5');
  };

  return (
    <div className="step4-container">
      <h2 className="step4-title">Fotos</h2>
      <p className="step4-subtitle">
        <strong>Subir fotos (mínimo 1, máximo 10)</strong><br />
        <small>(Formatos: .jpg, .png)</small>
      </p>

      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p>📁 Arrastrá archivos a esta zona </p>
        <input
          type="file"
          accept=".jpg,.png"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="upload-button">
          O seleccioná tus archivos desde el ordenador
        </label>
      </div>

      <ul className="file-list">
        {files.map((file, i) => (
          <li key={i}>{file.name}</li>
        ))}
      </ul>

      <button className="step4-button" onClick={handleSubmit}>
        Siguiente
      </button>

      <div className="steps">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`step ${i < 3 ? 'done' : ''} ${i === 3 ? 'active' : ''}`}
          >
            <div className="circle">{i < 3 ? '✔️' : ''}</div>
            <span>Step {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
