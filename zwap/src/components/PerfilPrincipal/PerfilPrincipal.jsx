import './PerfilPrincipal.css';
import { useNavigate } from 'react-router-dom';

export default function PerfilPrincipal() {
  const navigate = useNavigate();

  const irACrearPublicacion = () => {
    navigate('/perfil/step1');
  };

  return (
    <div className="perfil-container">
      {/* Columna izquierda: perfil */}
      <div className="perfil-izquierda">
        <img
          className="perfil-foto"
          src="https://via.placeholder.com/150"
          alt="Foto de perfil"
        />
        <h2>Micaela Pérez</h2>
        <p className="perfil-descripcion">
          Me encanta viajar, con mis amigos o sola. Tengo dos mascotas e intento
          traerlos en mis viajes
        </p>
        <p><strong>Mail:</strong> micaelaperez@gmail.com</p>
        <p><strong>Teléfono:</strong> 11 9876 2700</p>
        <button className="btn-editar">Editar</button>
      </div>

      {/* Columna derecha: publicaciones y objetivos */}
      <div className="perfil-derecha">
        <div className="estadisticas">
          <div className="card-estadistica">
            <div className="top-estadistica">
              <p>5 Intercambios</p>
              <button className="btn-mas">+</button>
            </div>
            <div className="progreso-circular">25%</div>
            <p className="subtexto">en 2 países</p>
          </div>

          <div className="card-estadistica">
            <div className="top-estadistica">
              <p>2 Pendientes</p>
              <button className="btn-mas">+</button>
            </div>
            <div className="progreso-circular">70%</div>
            <p className="subtexto">en 2 países</p>
          </div>

          <div className="card-estadistica favorito">
            <p>6 Favoritos</p>
            <p className="subtexto">de 4 usuarios</p>
          </div>
        </div>

        <div className="publicaciones">
          <h3>Mis Publicaciones</h3>
          <div className="grid-publicaciones">
            {/* Card de ejemplo */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="card-publicacion">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Casa"
                  className="img-publicacion"
                />
                <p className="estado">🟢 Disponible</p>
                <h4>Nombre de la casa {i + 1}</h4>
                <p>Texto 1 · Texto 2 · Texto 3</p>
                <p>Provincia, País</p>
              </div>
            ))}
            {/* Botón para crear nueva publicación */}
            <div className="card-publicacion nueva" onClick={irACrearPublicacion}>
              <span className="mas-grande">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
