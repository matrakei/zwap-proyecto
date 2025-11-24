import './Login3editar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login3editar() {
  const navigate = useNavigate();
  const [greetingIndex, setGreetingIndex] = useState(0);

  // 🔹 Guardar usuario logueado
  const [usuario, setUsuario] = useState(null);

  const greetings = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];

  // 🔹 Cargar usuario desde localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (data) setUsuario(data);
  }, []);

  // 🔹 Animación de saludos
  useEffect(() => {
    const interval = setInterval(
      () => setGreetingIndex((prev) => (prev + 1) % greetings.length),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login4editar");
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

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Estado"
            defaultValue={usuario?.ProvinciaEstado || ""}
          />

          <input
            type="text"
            placeholder="Ciudad"
            defaultValue={usuario?.Ciudad || ""}
          />

          <input
            type="text"
            placeholder="Fecha de nacimiento"
            defaultValue={usuario?.FechaNacimiento || ""}
          />

          <input
            type="text"
            placeholder="Descripción (Opcional)"
            defaultValue={usuario?.Descripcion || ""}
          />

          <button type="submit" className="btn-siguiente">
            Guardar y Continuar
          </button>
        </form>

        <div className="steps">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`step ${i === 2 ? 'active' : ''}`}>
              <div className="circle" />
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
