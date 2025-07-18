import './Step2.css';
import { useNavigate } from 'react-router-dom';

export default function Step2() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/perfil/step3');
  };

  return (
    <div className="step2-container">
      <h2 className="step2-title">Características del hogar</h2>

      <form className="step2-form" onSubmit={handleSubmit}>
        <label>
          Sobre la propiedad
          <select>
            <option>Seleccioná el N° de ambientes</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>
        </label>

        <label>
          <select>
            <option>Seleccioná el N° de pisos</option>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </label>

        <label>
          Escribí el N° de metros cuadrados
          <input type="text" placeholder="Type here..." />
        </label>

        <label>
          Nombre (Opcional)
          <input type="text" placeholder="Type here..." />
        </label>

        <label>
          Breve descripción
          <input type="text" placeholder="Type here..." />
        </label>

        <button type="submit" className="step2-button">Siguiente</button>
      </form>

      <div className="steps">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`step ${i === 1 ? 'active' : ''} ${i < 1 ? 'done' : ''}`}
          >
            <div className="circle">{i < 1 ? '✔️' : ''}</div>
            <span>Step {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
