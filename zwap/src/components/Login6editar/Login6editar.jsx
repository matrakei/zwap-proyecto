import './Login6editar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Login6editar() {
  const navigate = useNavigate();

  const mensajes = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % mensajes.length);
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/perfil");
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1>{mensajes[indice]}</h1>
        <p>Editá tu información personal para mantenerla actualizada</p>
        <button className="btn-login" onClick={() => navigate("/perfil")}>
          Volver al Perfil
        </button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Editar Perfil</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nueva Contraseña" />
          <input type="text" placeholder="Confirmar Nueva Contraseña" />
          <button type="submit" className="btn-siguiente">
            Guardar Cambios
          </button>
        </form>

        <div className="steps">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`step ${i === 2 ? 'active' : ''}`}
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
