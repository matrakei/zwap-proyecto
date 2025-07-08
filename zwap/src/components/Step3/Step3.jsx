import './Step3.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Step3() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  const handleToggle = (service) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/perfil/step4');
  };

  const options = [
    "Pileta",
    "Gimnasio",
    "Patio o jardín",
    "Red Wi-Fi",
    "Aire acondicionado",
    "Calefacción",
    "Estacionamiento",
    "Cocina equipada"
  ];

  return (
    <div className="step3-container">
      <h2 className="step3-title">Servicios y comodidades</h2>
      <p className="step3-subtitle">
        <strong>Seleccione todo lo que contenga su propiedad.</strong> <span title="Campo opcional">ℹ️</span>
      </p>

      <form className="step3-form" onSubmit={handleSubmit}>
        {options.map((option, i) => (
          <label key={i} className="checkbox-label">
            <input
              type="checkbox"
              checked={services.includes(option)}
              onChange={() => handleToggle(option)}
            />
            {option}
          </label>
        ))}

        <button type="submit" className="step3-button">Siguiente</button>
      </form>

      <div className="steps">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`step ${i < 2 ? 'done' : ''} ${i === 2 ? 'active' : ''}`}
          >
            <div className="circle">{i < 2 ? '✔️' : ''}</div>
            <span>Step {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
