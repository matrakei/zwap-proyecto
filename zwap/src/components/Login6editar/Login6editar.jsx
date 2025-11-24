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

  // 🔹 datos que fui guardando de pasos anteriores
  const [editData, setEditData] = useState({});
  const [usuarioOriginal, setUsuarioOriginal] = useState(null);

  // 💬 rotación de mensajes
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % mensajes.length);
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);

  // 🟢 cargar info acumulada + usuario previo
  useEffect(() => {
    const storedEdit = JSON.parse(localStorage.getItem("editandoUsuario")) || {};
    const storedUser = JSON.parse(localStorage.getItem("usuarioLogueado"));

    setEditData(storedEdit);
    setUsuarioOriginal(storedUser);
  }, []);

  // 🟢 guardar en backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioOriginal) {
      alert("No se encontró usuario logueado.");
      return;
    }

    // merge final
    const usuarioActualizado = {
      ...usuarioOriginal,
      ...editData
    };

    try {
      const res = await fetch(`http://localhost:3001/api/usuarios/${usuarioOriginal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado)
      });

      const data = await res.json();

      // guardar nuevo usuario en localStorage
      localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
      localStorage.removeItem("editandoUsuario");

      alert("Cambios guardados correctamente ❤️");
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      alert("Error al guardar cambios.");
    }
  };

  return (
    <div className="registro-container">
      
      {/* COLUMNA IZQUIERDA */}
      <div className="col-izquierda">
        <h1>{mensajes[indice]}</h1>
        <p>Editá tu información personal para mantenerla actualizada</p>
        <button className="btn-login" onClick={() => navigate("/perfil")}>
          Volver al Perfil
        </button>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="col-derecha">
        <h2>Editar Perfil</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="Nueva Contraseña"
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, Contrasena: e.target.value }))
            }
          />

          <input
            type="password"
            placeholder="Confirmar Nueva Contraseña"
          />

          <button type="submit" className="btn-siguiente">
            Guardar Cambios
          </button>
        </form>

        <div className="steps">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`step ${i === 2 ? 'active' : ''}`}>
              <div className="circle">{i < 2 ? "✓" : ""}</div>
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
