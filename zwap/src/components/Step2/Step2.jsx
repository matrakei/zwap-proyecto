import './Step2.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Step2() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() =>
    JSON.parse(localStorage.getItem('publicacionEnProceso')) || {}
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/publicaciones/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          NumeroAmbientes: formData.ambientes,
          NumeroPisos: formData.pisos,
          MetrosCuadrados: formData.metros,
          NombrePropiedad: formData.nombre,
          BreveDescripcion: formData.descripcion,
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar datos");
      const data = await response.json();
      localStorage.setItem("publicacionEnProceso", JSON.stringify(data.publicacion));
      navigate('/perfil/step3');
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor local");
    }
  };

  return (
    <div className="registro-container">
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

      <div className="col-derecha">
        <form className="form-css" onSubmit={handleNext}>
          <label>Número de ambientes</label>
          <select name="ambientes" value={formData.ambientes || ''} onChange={handleChange}>
            <option value="">Seleccioná el número de ambientes</option>
            <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option>
          </select>

          <label>Número de pisos</label>
          <select name="pisos" value={formData.pisos || ''} onChange={handleChange}>
            <option value="">Seleccioná el número de pisos</option>
            <option value="1">1</option><option value="2">2</option><option value="3+">3+</option>
          </select>

          <label>Número de metros cuadrados</label>
          <input type="text" name="metros" value={formData.metros || ''} onChange={handleChange} />

          <label>Nombre (Opcional)</label>
          <input type="text" name="nombre" value={formData.nombre || ''} onChange={handleChange} />

          <label>Breve descripción (Opcional)</label>
          <textarea name="descripcion" value={formData.descripcion || ''} onChange={handleChange} rows="3" />

          <button type="submit" className="btn-siguiente">Siguiente</button>
        </form>

        {/* 🔹 Mantengo steps */}
        <div className="steps">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`step ${i < 1 ? 'done' : ''} ${i === 1 ? 'active' : ''}`}>
              <div className="circle">{i < 1 ? '✓' : ''}</div>
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
