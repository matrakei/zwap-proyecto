import './Favoritos.css';
import { useState } from 'react';
import perfilImage from '../../assets/Fotos de prueba/perfil.png';

// Importar imágenes de publicaciones
import casa1 from '../../assets/Home/Casa1.png';
import casa2 from '../../assets/Home/Casa2.png';
import casa3 from '../../assets/Home/Casa3.png';
import casa4 from '../../assets/Home/Casa4.png';
import casa5 from '../../assets/Home/Casa5.png';

export function Favoritos() {
  const publicaciones = [
    { id: 1, titulo: "Casa 1", autor: "usuario1", disponible: true, imagen: casa1, ubicacion: "Argentina, Buenos Aires" },
    { id: 2, titulo: "Casa 2", autor: "usuario2", disponible: false, imagen: casa2, ubicacion: "Brasil, Brasília" },
    { id: 3, titulo: "Casa 3", autor: "usuario3", disponible: true, imagen: casa3, ubicacion: "Chile, Santiago" },
    { id: 4, titulo: "Casa 4", autor: "usuario4", disponible: true, imagen: casa4, ubicacion: "Canadá, Ottawa" },
    { id: 5, titulo: "Casa 5", autor: "usuario5", disponible: true, imagen: casa5, ubicacion: "Reino Unido, Londres" },
  ];

  // 🔹 Aquí simulo favoritos (después lo puedes conectar con tu estado global o contexto)
  const [favoritos, setFavoritos] = useState([1, 3, 5]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const publicacionesFavoritas = publicaciones.filter((pub) =>
    favoritos.includes(pub.id)
  );

  return (
    <div className="perfil-container">
      <div className="perfil-izquierda">
        <img className="perfil-foto" src={perfilImage} alt="Foto de perfil" />
        <h2>Micaela Pérez</h2>
        <div className="perfil-info-bloque">
          <p className="info-label">Descripción</p>
          <p className="info-texto"> Me encanta viajar, con mis amigos o sola. Tengo dos mascotas e intento
            llevarlas a mis viajes</p>
        </div>
        <div className="perfil-info-bloque">
          <p className="info-label">Mail</p>
          <p className="info-texto">micaperez@gmail.com</p>
        </div>
        <div className="perfil-info-bloque">
          <p className="info-label">Teléfono</p>
          <p className="info-texto">11 58272610</p>
        </div>
      </div>

      <div className="perfil-derecha">
        <div className="estadisticas">
          <div className="card-estadistica favorito">
            <span className="si--heart-fill" style={{ position: 'absolute', top: 12, right: 14 }}></span>
            <span className="numero-estadistica">{publicacionesFavoritas.length}</span>
            <span className="titulo-estadistica">Favoritos</span>
            <span className="subtexto-estadistica">Guardados por ti</span>
          </div>
        </div>

        <div className="publicaciones">
          <h3>Mis Favoritos</h3>
          <div className="grid-publicaciones">
            {publicacionesFavoritas.length > 0 ? (
              publicacionesFavoritas.map((pub) => (
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
              ))
            ) : (
              <p>No tienes favoritos aún </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favoritos;
