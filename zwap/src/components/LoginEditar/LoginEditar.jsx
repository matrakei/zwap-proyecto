import './LoginEditar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function LoginEditar() {
  const navigate = useNavigate();
  const [saludoIndex, setSaludoIndex] = useState(0);

  // 🔹 Estado para guardar los datos del usuario logueado
  const [usuario, setUsuario] = useState(null);

  const saludos = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!", "¡Olá!",
    "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];

  // 🔹 Cargar usuario desde localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (data) setUsuario(data);
  }, []);

  // 🔹 Animación de saludos
  useEffect(() => {
    const interval = setInterval(() => {
      setSaludoIndex((prev) => (prev + 1) % saludos.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login2editar");
  };

  return (
    <div className="registro-container">
      
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1>{saludos[saludoIndex]}</h1>
        <p>Edita tus datos personales para mantener tu perfil actualizado.</p>
        <button className="btn-login" onClick={() => navigate("/perfil")}>
          Volver al perfil
        </button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Editar Perfil</h2>

        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Nombre Completo"
            defaultValue={usuario?.NombreCompleto || usuario?.Nombre || ""}
          />

          <input
            type="text"
            placeholder="Nombre de usuario"
            defaultValue={usuario?.NombreUsuario || ""}
          />

          <input
            type="text"
            placeholder="Correo electrónico"
            defaultValue={usuario?.CorreoElectronico || ""}
          />

          <button type="submit" className="btn-siguiente">
            Siguiente
          </button>
        </form>

        <div className="steps">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`step ${i === 0 ? 'active' : ''}`}>
              <div className="circle" />
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
