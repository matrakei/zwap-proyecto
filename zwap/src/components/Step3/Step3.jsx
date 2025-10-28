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
      const serviciosActualizados = prev.servicios.includes(service)
        ? prev.servicios.filter((s) => s !== service)
        : [...prev.servicios, service];
      return { ...prev, servicios: serviciosActualizados };
    });
  };

  const enviarAlBackend = async (datos) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      };

      const urlBase = 'http://localhost:3000/api/publicaciones';

      const body = JSON.stringify({
        Pais: datos.pais,
        ProvinciaEstado: datos.provincia,
        CiudadLocalidad: datos.ciudad,
        CalleYNumero: datos.calle,
        TipoPropiedad: datos.tipo,
        NumeroAmbientes: datos.ambientes,
        NumeroPisos: datos.pisos,
        MetrosCuadrados: datos.metros,
        NombrePropiedad: datos.nombre,
        BreveDescripcion: datos.descripcion,
        Amenities: datos.servicios || [],
        Fotos: datos.imagenes || [],
      });

      const response = await fetch(
        datos.idPublicacion ? `${urlBase}/${datos.idPublicacion}` : urlBase,
        {
          method: datos.idPublicacion ? 'PUT' : 'POST',
          headers,
          body,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Error en backend:', error);
        alert('Error al guardar servicios');
        return;
      }

      const data = await response.json();
      console.log('✅ Servicios guardados/actualizados:', data);

      if (data?.publicacion?.id && !datos.idPublicacion) {
        const actualizado = { ...datos, idPublicacion: data.publicacion.id };
        setFormData(actualizado);
        localStorage.setItem('publicacionEnProceso', JSON.stringify(actualizado));
      }
    } catch (error) {
      console.error('❌ Error de conexión con backend:', error);
      alert('No se pudo conectar con el servidor');
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
                  checked={formData.servicios.includes(option)}
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
