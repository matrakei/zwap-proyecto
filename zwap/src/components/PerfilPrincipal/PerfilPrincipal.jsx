import './PerfilPrincipal.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import casaImage from '../../assets/Fotos de prueba/casaa.jpg';

export function PerfilPrincipal() {
  const navigate = useNavigate();

  const publicaciones = [
    { id: 1, titulo: "Casa 1", autor: "usuario1", disponible: true },
    { id: 2, titulo: "Casa 2", autor: "usuario2", disponible: false },
    { id: 3, titulo: "Casa 3", autor: "usuario1", disponible: true },
    { id: 4, titulo: "Casa 4", autor: "usuario3", disponible: true },
    { id: 5, titulo: "Casa 5", autor: "usuario4", disponible: false }
  ];

  const [favoritos, setFavoritos] = useState([]);
  const [showObjetivo, setShowObjetivo] = useState(false);
  const [objetivoIntercambios, setObjetivoIntercambios] = useState(5);

  const irACrearPublicacion = () => {
    navigate('/perfil/step1');
  };

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const favoritosCount = favoritos.length;
  const usuariosFavoritos = [
    ...new Set(
      favoritos
        .map((id) => publicaciones.find((pub) => pub.id === id)?.autor)
        .filter(Boolean)
    )
  ].length;

  return (
    <div className="perfil-container">
      {showObjetivo && (
        <div className="modal-objetivo">
          <div className="modal-objetivo-content">
            <button className="modal-close" onClick={() => setShowObjetivo(false)}>×</button>
            <h2>
              <b>Objetivo</b> <span style={{ color: "#39B3B8" }}>Zwap</span>
            </h2>
            <p>¿Cuántos intercambios querés lograr con Zwap?</p>
            <select
              value={objetivoIntercambios}
              onChange={e => {
                setObjetivoIntercambios(Number(e.target.value));
                setShowObjetivo(false);
              }}
            >
              {[...Array(6).keys()].map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="perfil-izquierda">
        <img
          className="perfil-foto"
          src="https://via.placeholder.com/150"
          alt="Foto de perfil"
        />
        <h2>Micaela Pérez</h2>
        <p className="perfil-descripcion">
          Me encanta viajar, con mis amigos o sola. Tengo dos mascotas e intento
          llevarlas a mis viajes
        </p>
        <p><strong>Mail:</strong> Micaperéz@gmail.com</p>
        <p><strong>Teléfono:</strong> 11 58272610</p>
        <button className="btn-editar">Editar</button>
      </div>

      <div className="perfil-derecha">
        <div className="estadisticas">
          <div className="card-estadistica intercambio">
            <button className="btn-mas" onClick={() => setShowObjetivo(true)}>+</button>
            <span className="numero-estadistica">{objetivoIntercambios}</span>
            <span className="titulo-estadistica">Intercambios</span>
            <span className="subtexto-estadistica">En 4 países</span>
          </div>

          <div className="card-estadistica pendiente">
            <button className="btn-mas">+</button>
            <span className="numero-estadistica">2</span>
            <span className="titulo-estadistica">Pendientes</span>
            <span className="subtexto-estadistica">En 2 países</span>
          </div>

          <div className="card-estadistica favorito">
            <span className="si--heart-fill" style={{ position: 'absolute', top: 12, right: 14 }}></span>
            <span className="numero-estadistica">{favoritosCount}</span>
            <span className="titulo-estadistica">Favoritos</span>
            <span className="subtexto-estadistica">de {usuariosFavoritos} usuarios</span>
          </div>
        </div>

        <div className="publicaciones">
          <h3>Mis Publicaciones</h3>
          <div className="grid-publicaciones">
            {publicaciones.map((pub) => (
              <div key={pub.id} className="card-publicacion">
                <div className="imagen-container">
                  <img
                    src={casaImage}
                    alt={pub.titulo}
                    className="img-publicacion"
                  />
                  <button
                    className="btn-favorito"
                    onClick={() => toggleFavorito(pub.id)}
                  >
                    {favoritos.includes(pub.id) ? (
                      <span className="si--heart-fill"></span>
                    ) : (
                      <span className="si--heart-line"></span>
                    )}
                  </button>
                  <div className="estado-badge">
                    {pub.disponible ? ' DISPONIBLE' : ' NO DISPONIBLE'}
                  </div>
                </div>
                <div className="info-publicacion">
                  <h4>{pub.titulo} </h4>
                  <p className="subtexto-card">Texto 1 · Texto 2 · Texto 3</p>
                  <p className="subtexto-card">📍 Luján de Cuyo, Mendoza</p>
                  <div className="autor-publicacion">👤 {pub.autor}</div>
                </div>
              </div>
            ))}

            <div className="card-publicacion nueva" onClick={irACrearPublicacion}>
              <span className="mas-grande">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
