import './Step3.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Step3() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem('publicacionEnProceso')) || {
      servicios: [],
      idPublicacion: null,
    };
  });

  const options = [
    "Pileta",
    "Gimnasio",
    "Patio o jardín",
    "Red Wi-Fi",
    "Aire acondicionado",
    "Calefacción",
    "Estacionamiento",
    "Cocina equipada",
  ];

  const handleToggle = (service) => {
    setFormData((prev) => {
      const serviciosActualizados = prev.servicios?.includes(service)
        ? prev.servicios.filter((s) => s !== service)
        : [...(prev.servicios || []), service];
      return { ...prev, servicios: serviciosActualizados };
    });
  };

  const enviarAlBackend = async (datos) => {
    try {
      const response = await fetch(`http://localhost:3001/api/publicaciones/${datos.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...datos,
          Amenities: datos.servicios || [],
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar servicios");
      const data = await response.json();
      localStorage.setItem("publicacionEnProceso", JSON.stringify(data.publicacion));
    } catch (error) {
      console.error('❌ Error al conectar con el backend local:', error);
      alert('No se pudo conectar con el servidor local');
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    localStorage.setItem('publicacionEnProceso', JSON.stringify(formData));
    await enviarAlBackend(formData);
    navigate('/perfil/step4');
  };

  return (
    <div className="registro-container">
      {/* 🟦 Columna izquierda */}
      <div className="col-izquierda">
        <div className="imagenes-content">
          <h2>Imágenes</h2>
          <p className="step4-subtitle">
            Subí fotos (mínimo 1, máximo 10)
            <br />
            <small>(Formatos: JPG, PNG)</small>
          </p>

          <div className="dropzone disabled">
            <p>📁 Las imágenes ya fueron cargadas</p>
          </div>

          <button className="btn-volver" onClick={() => navigate('/perfil/step1')}>
            Volver a imágenes
          </button>
        </div>
      </div>

      {/* ⚪ Columna derecha */}
      <div className="col-derecha">
        <form className="form-css" onSubmit={handleNext}>
          <label>Seleccione todo lo que contenga su propiedad:</label>
          <div className="checkbox-group">
            {options.map((option, i) => (
              <label key={i} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.servicios?.includes(option) || false}
                  onChange={() => handleToggle(option)}
                />
                {option}
              </label>
            ))}
          </div>

          <button type="submit" className="btn-siguiente">
            Siguiente
          </button>
        </form>

        {/* 🔹 Steps visuales intactos */}
        <div className="steps">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`step ${i < 2 ? 'done' : ''} ${i === 2 ? 'active' : ''}`}
            >
              <div className="circle">{i < 2 ? '✓' : ''}</div>
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
