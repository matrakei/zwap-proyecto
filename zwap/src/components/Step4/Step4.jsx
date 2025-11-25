import './Step4.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step4() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // 🔥 Convertir archivo a Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 🔥 Cuando arrastran archivos
  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    const base64Images = await Promise.all(
      droppedFiles.map((f) => fileToBase64(f))
    );

    setFiles((prev) => [...prev, ...base64Images]);
  };

  // 🔥 Cuando seleccionan archivos desde el input
  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    const base64Images = await Promise.all(
      selectedFiles.map((f) => fileToBase64(f))
    );

    setFiles((prev) => [...prev, ...base64Images]);
  };

  // 🔥 Guardar en el backend
  const handleSubmit = async () => {
    const publicacionActual =
      JSON.parse(localStorage.getItem('publicacionEnProceso')) || {};

    const actualizada = { ...publicacionActual, imagenes: files };

    try {
      const response = await fetch(
        `http://localhost:3001/api/publicaciones/${actualizada.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...actualizada,
            Imagenes: files, // ← GUARDA BASE64 REAL
          }),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar imágenes");
      const data = await response.json();

      localStorage.setItem(
        'publicacionEnProceso',
        JSON.stringify(data.publicacion)
      );

      navigate('/perfil/step5');
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor local");
    }
  };

  return (
    <div className="step4-container">
      <h2 className="step4-title">Fotos</h2>
      <p className="step4-subtitle">
        <strong>Subir fotos (mínimo 1, máximo 10)</strong><br />
        <small>(Acepta cualquier tipo de imagen)</small>
      </p>

      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p>📁 Arrastrá archivos a esta zona </p>

        <input
          type="file"
          accept="image/*"   // ✔ ahora acepta cualquier tipo de imagen
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
          <li key={i}>
            <img src={file} alt={`preview-${i}`} className="preview-img" />
          </li>
        ))}
      </ul>

      <button className="step4-button" onClick={handleSubmit}>
        Siguiente
      </button>

      {/* 🔹 Steps visuales */}
      <div className="steps">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`step ${i < 3 ? 'done' : ''} ${i === 3 ? 'active' : ''}`}
          >
            <div className="circle">{i < 3 ? '✓' : ''}</div>
            <span>Step {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
