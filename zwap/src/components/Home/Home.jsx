import './Home.css';
import { useState } from 'react';
import casaImage from '../../assets/Fotos de prueba/casa2.jpg';
import search from '../../assets/Home/Group 199.png';

export function Home() {
  const publicaciones = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    titulo: `Casa ${i + 1}`,
    descripcion: "Hermosa casa con jardín y pileta",
    imagen: casaImage,
  }));

  const [favoritos, setFavoritos] = useState([]);
  const [showInput, setShowInput] = useState(false);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="home-container">
      {/* Barra de filtros */}
      <div className="filtros-bar">
        <select>
          <option>Ubicación</option>
          <option>Mendoza</option>
          <option>Buenos Aires</option>
          <option>Córdoba</option>
        </select>

        <select>
          <option>Tipo de propiedad</option>
          <option>Casa</option>
          <option>Departamento</option>
          <option>Cabaña</option>
        </select>

        <select>
          <option>Cantidad de ambientes</option>
          <option>1</option>
          <option>2</option>
          <option>3+</option>
        </select>

        <select>
          <option>Servicios incluidos</option>
          <option>Pileta</option>
          <option>WiFi</option>
          <option>Pet Friendly</option>
        </select>

        <select>
          <option>Reciente</option>
          <option>Más antiguo</option>
          <option>Más populares</option>
        </select>

        {/* Botón de búsqueda con lupa */}
        <div className="search-container">
          <button
            className="search-button"
            onClick={() => setShowInput(!showInput)}
          >
            <img src={search} alt="Buscar" />
          </button>

          {showInput && (
            <input
              type="text"
              className="search-input"
              placeholder="Buscar..."
              autoFocus
            />
          )}
        </div>
      </div>

      {/* Feed de publicaciones */}
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
              <p className="subtexto-card">📍 Ubicación random</p>
              <div className="autor-publicacion">👤 {pub.autor}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
