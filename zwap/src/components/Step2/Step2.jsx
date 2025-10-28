import './Step2.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Step2() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem('publicacionEnProceso')) || {
      pais: '',
      provincia: '',
      ciudad: '',
      calle: '',
      tipo: '',
      ambientes: '',
      pisos: '',
      metros: '',
      nombre: '',
      descripcion: '',
      imagenes: [],
      idPublicacion: null,
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 👉 Enviar datos al backend
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
        console.error('Error en la respuesta del backend:', error);
        alert('Error al guardar la información');
        return null;
      }

      const data = await response.json();
      console.log('✅ Publicación guardada/actualizada:', data);

      if (data?.publicacion?.id && !datos.idPublicacion) {
        const actualizado = { ...datos, idPublicacion: data.publicacion.id };
        setFormData(actualizado);
        localStorage.setItem('publicacionEnProceso', JSON.stringify(actualizado));
      }
    } catch (error) {
      console.error('❌ Error al conectar con el backend:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    localStorage.setItem('publicacionEnProceso', JSON.stringify(formData));
    await enviarAlBackend(formData);
    navigate('/perfil/step3');
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
          <label>Número de ambientes</label>
          <select name="ambientes" value={formData.ambientes} onChange={handleChange}>
            <option value="">Seleccioná el número de ambientes</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </select>

          <label>Número de pisos</label>
          <select name="pisos" value={formData.pisos} onChange={handleChange}>
            <option value="">Seleccioná el número de pisos</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3+</option>
          </select>

          <label>Número de metros cuadrados</label>
          <input
            type="text"
            name="metros"
            value={formData.metros}
            onChange={handleChange}
            placeholder="Ej: 120"
          />

          <label>Nombre (Opcional)</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Casa de la montaña"
          />

          <label>Breve descripción (Opcional)</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ej: Hermosa casa con vista al lago..."
            rows="3"
          />

          <button type="submit" className="btn-siguiente">
            Siguiente
          </button>
        </form>

        <div className="steps">
          {[...Array(5)].map((_, i) => (
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
