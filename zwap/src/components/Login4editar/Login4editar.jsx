import './Login4editar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login4editar() {
  const navigate = useNavigate();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login5editar");
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1>{greetings[greetingIndex]}</h1>
        <p>Editá tu información personal para mantenerla actualizada</p>
        <button className="btn-login" onClick={() => navigate("/perfil")}>
          Volver al Perfil
        </button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Editar Perfil</h2>

        <form className="Formulario" onSubmit={handleSubmit}>
          <label>
            Tipo de Documento
            <select className="DNI">
              <option>DNI</option>
              <option>Cédula de identidad</option>
              <option>National Identity Card</option>
              <option>Carte Nationale d'Identité</option>
              <option>Personalausweis</option>
            </select>
          </label>
          <input type="text" placeholder="Número de Documento" />
          <button type="submit" className="btn-siguiente">
            Guardar y Continuar
          </button>
        </form>

        <div className="steps">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`step ${i === 1 ? 'active' : ''}`}
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
