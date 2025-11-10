import './Step5.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Step5() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('publicacionEnProceso'));
    setFormData(data);
  }, []);

  const handlePublicar = async () => {
    if (!formData || !formData.id) {
      alert('No se encontró la publicación para actualizar');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/publicaciones/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, publicada: true }),
      });

      if (!response.ok) throw new Error("Error al publicar");
      await response.json();

      alert('Publicación completada con éxito 🎉');
      localStorage.removeItem('publicacionEnProceso');
      navigate('/perfil');
    } catch (error) {
      console.error('❌ Error al publicar:', error);
      alert('Error al conectar con el servidor local');
    }
  };

  if (!formData) return <p>Cargando...</p>;

  return (
    <div className="step5-container">
      <div className="step5-header">
        <span className="etiqueta">DISPONIBLE PARA INTERCAMBIAR</span>
        <h2 className="step5-title">{formData.nombre || 'Propiedad sin título'}</h2>
        <p className="step5-location">
          📍 {formData.ciudad}, {formData.provincia}, {formData.pais}
        </p>
        <p className="step5-type">🏠 Tipo: {formData.tipo}</p>
        <p className="step5-size">📐 Superficie: {formData.metros || 'N/D'} m²</p>
      </div>

      {formData.descripcion && (
        <div className="step5-description">
          <p><strong>Descripción:</strong></p>
          <p>{formData.descripcion}</p>
        </div>
      )}

      {formData.servicios?.length > 0 && (
        <div className="step5-services">
          <p><strong>Servicios, comodidades y restricciones:</strong></p>
          <ul>
            {formData.servicios.map((s, i) => (
              <li key={i}>✅ {s}</li>
            ))}
          </ul>
        </div>
      )}

      {formData.imagenes?.length > 0 && (
        <div className="step5-images">
          {formData.imagenes.map((img, i) => (
            <img key={i} src={img} alt={`foto-${i}`} className="preview-img" />
          ))}
        </div>
      )}

      <button className="step5-button" onClick={handlePublicar}>
        Publicar
      </button>

      {/* 🔹 Mantengo tus steps */}
      <div className="steps">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`step ${i < 4 ? 'done' : ''} ${i === 4 ? 'active' : ''}`}
          >
            <div className="circle">{i < 4 ? '✓' : ''}</div>
            <span>Step {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
