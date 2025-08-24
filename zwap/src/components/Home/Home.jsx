import './Home.css';
import { useState } from 'react';
import search from '../../assets/Home/Group 199.png';
import casa1 from '../../assets/Home/Casa1.png';
import casa2 from '../../assets/Home/Casa2.png';
import casa3 from '../../assets/Home/Casa3.png';
import casa4 from '../../assets/Home/Casa4.png';
import casa5 from '../../assets/Home/Casa5.png';
import casa6 from '../../assets/Home/Casa6.png';
import casa7 from '../../assets/Home/Casa7.png';
import casa8 from '../../assets/Home/Casa8.png';
import casa9 from '../../assets/Home/Casa9.png';
import casa10 from '../../assets/Home/Casa10.png';

export function Home() {
 
  const imagenes = [
    casa1, casa2, casa3, casa4, casa5,
    casa6, casa7, casa8, casa9, casa10,
  ];

 
  const autores = ['usuario1','usuario2','usuario3','usuario4','usuario5'];
  const ubicaciones = [
    'Argentina, Buenos Aires',
    'Brasil, Brasília',
    'Chile, Santiago',
    'Canadá, Ottawa',
    'Reino Unido, Londres',
    'Francia, París',
    'Alemania, Berlín',
    'Italia, Roma',
    'España, Madrid',
    'Rusia, Moscú',
    'China, Pekín',
    'Japón, Tokio',
    'India, Nueva Delhi',
    'Australia, Canberra',
    'Sudáfrica, Pretoria',
    'Arabia Saudita, Riad',
    'Turquía, Ankara',
    'Corea del Sur, Seúl'
  ];

  
  const publicaciones = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    titulo: `Casa ${i + 1}`,
    descripcion: 'Hermosa casa con jardín y pileta',
    imagen: imagenes[i % imagenes.length],
    autor: autores[i % autores.length],
    disponible: i % 3 !== 0, 
    ubicacion: ubicaciones[i % ubicaciones.length],
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
            <input type="text" className="search-input" placeholder="Buscar..." />
          )}
        </div>
      </div>

      {/* Feed de publicaciones */}
      <div className="grid-publicaciones">
        {publicaciones.map((pub) => (
          <div key={pub.id} className="card-publicacion">
            <div className="imagen-container">
              <img
                src={pub.imagen}
                alt={pub.titulo}
                className="img-publicacion"
              />
              <button
                className="btn-favorito"
                onClick={() => toggleFavorito(pub.id)}
                aria-label="Marcar favorito"
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
              <h4>{pub.titulo}</h4>
              <p className="subtexto-card">Texto 1 · Texto 2 · Texto 3</p>
              <p className="subtexto-card">📍 {pub.ubicacion}</p>
              <div className="autor-publicacion">👤 {pub.autor}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
