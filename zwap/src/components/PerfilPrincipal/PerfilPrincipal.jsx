import './PerfilPrincipal.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import casaImage from '../../assets/Fotos de prueba/casa2.jpg';
import perfilImage from '../../assets/Fotos de prueba/perfil.png';

import Cargar0 from '../../assets/porcentajes/Cargar 0.svg';
import Cargar5 from '../../assets/porcentajes/Cargar 5.svg';
import Cargar10 from '../../assets/porcentajes/Cargar 10.svg';
import Cargar15 from '../../assets/porcentajes/Cargar 15.svg';
import Cargar20 from '../../assets/porcentajes/Cargar 20.svg';
import Cargar25 from '../../assets/porcentajes/Cargar 25.svg';
import Cargar30 from '../../assets/porcentajes/Cargar 30.svg';
import Cargar35 from '../../assets/porcentajes/Cargar 35.svg';
import Cargar40 from '../../assets/porcentajes/Cargar 40.svg';
import Cargar45 from '../../assets/porcentajes/Cargar 45.svg';
import Cargar50 from '../../assets/porcentajes/Cargar 50.svg';
import Cargar55 from '../../assets/porcentajes/Cargar 55.svg';
import Cargar60 from '../../assets/porcentajes/Cargar 60.svg';
import Cargar65 from '../../assets/porcentajes/Cargar 65.svg';
import Cargar70 from '../../assets/porcentajes/Cargar 70.svg';
import Cargar75 from '../../assets/porcentajes/Cargar 75.svg';
import Cargar80 from '../../assets/porcentajes/Cargar 80.svg';
import Cargar85 from '../../assets/porcentajes/Cargar 85.svg';
import Cargar90 from '../../assets/porcentajes/Cargar 90.svg';
import Cargar95 from '../../assets/porcentajes/Cargar 95.svg';
import Cargar100 from '../../assets/porcentajes/Cargar 100.svg';

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
  const cantidadIntercambios = 2; // este valor debería actualizarse dinámicamente en tu sistema

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

  const porcentaje = Math.min(
    100,
    Math.round((cantidadIntercambios / objetivoIntercambios) * 100)
  );

  const porcentajeRedondeado = Math.round(porcentaje / 5) * 5;

  const imagenesPorcentaje = {
    0: Cargar0,
    5: Cargar5,
    10: Cargar10,
    15: Cargar15,
    20: Cargar20,
    25: Cargar25,
    30: Cargar30,
    35: Cargar35,
    40: Cargar40,
    45: Cargar45,
    50: Cargar50,
    55: Cargar55,
    60: Cargar60,
    65: Cargar65,
    70: Cargar70,
    75: Cargar75,
    80: Cargar80,
    85: Cargar85,
    90: Cargar90,
    95: Cargar95,
    100: Cargar100,
  };

  const imagenPorcentaje = imagenesPorcentaje[porcentajeRedondeado];

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
          src={perfilImage}
          alt="Foto de perfil"
        />
        <h2>Micaela Pérez</h2>

        <div className="perfil-info-bloque">
          <p className="info-label">Descripción</p>
          <p className="info-texto">
            Me encanta viajar, con mis amigos o sola. Tengo dos mascotas e intento
            llevarlas a mis viajes
          </p>
        </div>

        <div className="perfil-info-bloque">
          <p className="info-label">Mail</p>
          <p className="info-texto">Micaperéz@gmail.com</p>
        </div>

        <div className="perfil-info-bloque">
          <p className="info-label">Teléfono</p>
          <p className="info-texto">11 58272610</p>
        </div>

        <button className="btn-editar">Editar</button>
      </div>

      <div className="perfil-derecha">
        <div className="estadisticas">
          <div className="card-estadistica intercambio">
            <button className="btn-mas" onClick={() => setShowObjetivo(true)}>+</button>
            <span className="numero-estadistica">{objetivoIntercambios}</span>
            <span className="titulo-estadistica">Intercambios</span>
            <span className="subtexto-estadistica">En 4 países</span>

            <img 
              src={imagenPorcentaje} 
              alt={`${porcentajeRedondeado}%`} 
              className="imagen-porcentaje" 
              title={`${porcentajeRedondeado}% del objetivo alcanzado`}
            />
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
