import './Formulario.css';
import { useNavigate } from 'react-router-dom';

export const Formulario = () => {
  const navigate = useNavigate();

  return (
    <div className="body-container">
      <div className="form-container">
        <h2>Características del hogar</h2>

        <div className="form-group">
          <label>País <span title="Campo obligatorio">ℹ️</span></label>
          <input type="text" placeholder="Type here..." />

          <label>Provincia / Estado <span title="Campo obligatorio">ℹ️</span></label>
          <input type="text" placeholder="Type here..." />

          <label>Ciudad / Localidad <span title="Campo obligatorio">ℹ️</span></label>
          <input type="text" placeholder="Type here..." />

          <label>Calle y número <span title="Campo obligatorio">ℹ️</span></label>
          <input type="text" placeholder="Type here..." />
        </div>

        <div className="form-group">
          <label>Tipo de propiedad <span title="Campo obligatorio">ℹ️</span></label>
          <label><input type="checkbox" /> Casa</label>
          <label><input type="checkbox" /> Departamento</label>
          <label>
            <input type="checkbox" checked readOnly /> Otro
            <input type="text" placeholder="Type here..." />
          </label>
        </div>

        <button className="next-button" onClick={() => navigate('/perfil/step2')}>
          Siguiente
        </button>

        <div className="steps">
          {Array.from({ length: 5 }).map((_, i) => (
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