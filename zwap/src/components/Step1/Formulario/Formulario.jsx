import './Formulario.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Formulario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pais: '',
    provincia: '',
    ciudad: '',
    calle: '',
    tipo: '',
    imagenes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📁 Manejo de imágenes
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newPreviews = selectedFiles.map((f) => URL.createObjectURL(f));
    setFormData((prev) => ({ ...prev, imagenes: [...prev.imagenes, ...newPreviews] }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newPreviews = droppedFiles.map((f) => URL.createObjectURL(f));
    setFormData((prev) => ({ ...prev, imagenes: [...prev.imagenes, ...newPreviews] }));
  };

  const handleNext = () => {
    localStorage.setItem('publicacionEnProceso', JSON.stringify(formData));
    navigate('/perfil/step2');
  };

  return (
    <div className="registro-container">
      {/* Columna izquierda (idéntica al wireframe del login) */}
      <div className="col-izquierda">
        <h2>Imágenes</h2>
        <p className="step4-subtitle">
          Subí fotos (mínimo 1, máximo 10)  
          <br />
          <small>(Formatos: JPG, PNG)</small>
        </p>

        <div
          className="dropzone"
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
            Seleccionar archivos desde el ordenador
          </label>
        </div>

        {formData.imagenes.length > 0 && (
          <ul className="file-list">
            {formData.imagenes.map((img, i) => (
              <li key={i}>
                <img src={img} alt={`preview-${i}`} />
              </li>
            ))}
          </ul>

        )}
      </div>

      {/* Columna derecha */}
      <div className="col-derecha">
        <form class="form-css">
          <label>País</label>
          <input
            type="text"
            name="pais"
            value={formData.pais}
            onChange={handleChange} 
          />

          <label>Provincia / Estado</label>
          <input
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
          />

          <label>Ciudad / Localidad</label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          />

          <label>Calle y número</label>
          <input
            type="text"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
          />

          <label>Tipo de propiedad</label>
          <div className="checkbox-group">
            <label>
              <input type="radio" name="tipo" value="Casa" onChange={handleChange} /> Casa
            </label>
            <label>
              <input type="radio" name="tipo" value="Departamento" onChange={handleChange} /> Departamento
            </label>
            <label>
              <input type="radio" name="tipo" value="Otro" onChange={handleChange} /> Otro
              <input type="text" placeholder="Especificar" onChange={handleChange} />
            </label>
          </div>

          <button type="button" className="btn-siguiente" onClick={handleNext}>
            Siguiente
          </button>
        </form>

        <div className="steps">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`step ${i === 0 ? 'active' : ''}`}>
              <div className="circle" />
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
