import "./Favoritos.css";
import { useState, useEffect } from "react";
import perfilImage from "../../assets/Fotos de prueba/perfil.png";

// Importar imágenes de porcentaje (iguales a PerfilPrincipal)
import Cargar0 from "../../assets/porcentajes/Cargar 0.svg";
import Cargar5 from "../../assets/porcentajes/Cargar 5.svg";
import Cargar10 from "../../assets/porcentajes/Cargar 10.svg";
import Cargar15 from "../../assets/porcentajes/Cargar 15.svg";
import Cargar20 from "../../assets/porcentajes/Cargar 20.svg";
import Cargar25 from "../../assets/porcentajes/Cargar 25.svg";
import Cargar30 from "../../assets/porcentajes/Cargar 30.svg";
import Cargar35 from "../../assets/porcentajes/Cargar 35.svg";
import Cargar40 from "../../assets/porcentajes/Cargar 40.svg";
import Cargar45 from "../../assets/porcentajes/Cargar 45.svg";
import Cargar50 from "../../assets/porcentajes/Cargar 50.svg";
import Cargar55 from "../../assets/porcentajes/Cargar 55.svg";
import Cargar60 from "../../assets/porcentajes/Cargar 60.svg";
import Cargar65 from "../../assets/porcentajes/Cargar 65.svg";
import Cargar70 from "../../assets/porcentajes/Cargar 70.svg";
import Cargar75 from "../../assets/porcentajes/Cargar 75.svg";
import Cargar80 from "../../assets/porcentajes/Cargar 80.svg";
import Cargar85 from "../../assets/porcentajes/Cargar 85.svg";
import Cargar90 from "../../assets/porcentajes/Cargar 90.svg";
import Cargar95 from "../../assets/porcentajes/Cargar 95.svg";
import Cargar100 from "../../assets/porcentajes/Cargar 100.svg";

export function Favoritos() {
  const [usuario, setUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showObjetivo, setShowObjetivo] = useState(false);
  const [objetivoIntercambios, setObjetivoIntercambios] = useState(5);
  const cantidadIntercambios = 2; // Lo mismo que PerfilPrincipal

  // 🟢 usuario logueado
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (data) setUsuario(data);
  }, []);

  // 🟢 traer favoritos del backend
  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!usuario?.CorreoElectronico) return;

      try {
        const res = await fetch(
          `http://localhost:3001/api/favoritos/${usuario.CorreoElectronico}`
        );
        if (!res.ok) throw new Error("Error al cargar favoritos");

        const data = await res.json(); // [{id: x}]
        setFavoritos(data.map((f) => f.id));
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchFavoritos();
  }, [usuario]);

  // 🟢 traer todas las publicaciones
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/publicaciones");
        const raw = await res.text();

        let data;
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error("Respuesta inválida del servidor");
        }

        const arr = Array.isArray(data) ? data : data.publicaciones || [];
        setPublicaciones(arr);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  // 🟢 filtrar publicaciones favoritas
  const publicacionesFavoritas = publicaciones.filter((pub) =>
    favoritos.includes(pub.id)
  );

  // 🟢 cantidad de usuarios distintos
  const usuariosFavoritos = new Set(
    publicacionesFavoritas.map((pub) => pub.CorreoElectronico || pub.AutorId)
  ).size;

  // ❤️ toggle favorito
  const toggleFavorito = async (publicacionId) => {
    if (!usuario?.CorreoElectronico) {
      alert("Tenés que iniciar sesión");
      return;
    }

    const esFavorito = favoritos.includes(publicacionId);
    const metodo = esFavorito ? "DELETE" : "POST";

    try {
      await fetch("http://localhost:3001/api/favoritos", {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: usuario.CorreoElectronico,
          publicacionId,
        }),
      });

      setFavoritos((prev) =>
        esFavorito
          ? prev.filter((f) => f !== publicacionId)
          : [...prev, publicacionId]
      );
    } catch (err) {
      console.error(err);
    }
  };

  // porcentaje objetivo (igual al perfil)
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

  if (loading) return <p style={{ padding: 20 }}>Cargando...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div className="perfil-container">
      {/* IZQUIERDA – Mini perfil (idéntico al perfil principal) */}
      <div className="perfil-izquierda">
        <img className="perfil-foto" src={perfilImage} alt="Foto Perfil" />
        <h2>
          {usuario
            ? `${usuario.Nombre || ""} ${usuario.Apellido || ""}`
            : "Usuario sin nombre"}
        </h2>

        <div className="perfil-info-bloque">
          <p className="info-label">Descripción</p>
          <p className="info-texto">
            {usuario?.Descripcion || "Todavía no agregaste una descripción."}
          </p>
        </div>

        <div className="perfil-info-bloque">
          <p className="info-label">Mail</p>
          <p className="info-texto">{usuario?.CorreoElectronico}</p>
        </div>

        <div className="perfil-info-bloque">
          <p className="info-label">Teléfono</p>
          <p className="info-texto">
            {usuario?.NumeroTelefono
              ? `${usuario.CodigoPais ? "+" + usuario.CodigoPais + " " : ""}${
                  usuario.NumeroTelefono
                }`
              : "No cargado"}
          </p>
        </div>
      </div>

      {/* DERECHA – ESTADÍSTICAS + FAVORITOS (idéntico a Perfil) */}
      <div className="perfil-derecha">
        <div className="estadisticas">
          {/* TARJETA INTERCAMBIOS */}
          <div className="card-estadistica intercambio">
            <button
              className="btn-mas"
              onClick={() => setShowObjetivo(true)}
            >
              +
            </button>

            <span className="numero-estadistica">
              {objetivoIntercambios}
            </span>
            <span className="titulo-estadistica">Intercambios</span>
            <span className="subtexto-estadistica">En 4 países</span>
            <img
              src={imagenPorcentaje}
              alt={`${porcentajeRedondeado}%`}
              className="imagen-porcentaje"
            />
          </div>

          {/* TARJETA FAVORITOS */}
          <div className="card-estadistica favorito">
            <span className="si--heart-fill" style={{ position: "absolute", top: 12, right: 14 }}></span>
            <span className="numero-estadistica">{publicacionesFavoritas.length}</span>
            <span className="titulo-estadistica">Favoritos</span>
            <span className="subtexto-estadistica">
              de {usuariosFavoritos} usuarios
            </span>
          </div>
        </div>

        {/* MODAL OBJETIVO */}
        {showObjetivo && (
          <div className="modal-objetivo">
            <div className="modal-objetivo-content">
              <button className="modal-close" onClick={() => setShowObjetivo(false)}>
                ×
              </button>
              <h2>
                <b>Objetivo</b>{" "}
                <span style={{ color: "#39B3B8" }}>Zwap</span>
              </h2>
              <p>¿Cuántos intercambios querés lograr?</p>

              <select
                value={objetivoIntercambios}
                onChange={(e) => {
                  setObjetivoIntercambios(Number(e.target.value));
                  setShowObjetivo(false);
                }}
              >
                {[...Array(6).keys()].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* GRILLA DE FAVORITOS (idéntica al perfil) */}
        <div className="publicaciones">
          <h3>Mis Favoritos</h3>

          <div className="grid-publicaciones">
            {publicacionesFavoritas.length > 0 ? (
              publicacionesFavoritas.map((pub) => {
                const img =
                  pub.Fotos?.[0] ||
                  pub.Imagenes?.[0] ||
                  pub.imagenes?.[0] ||
                  "https://via.placeholder.com/300x200";

                const nombre =
                  pub.NombrePropiedad ||
                  pub.Nombre ||
                  "Propiedad sin nombre";

                const ciudad = pub.Ciudad || pub.CiudadLocalidad || "-";
                const pais = pub.Pais || "-";
                const estado =
                  pub.Estado === "No disponible"
                    ? "NO DISPONIBLE"
                    : "DISPONIBLE";

                return (
                  <div key={pub.id} className="card-publicacion">
                    <div className="imagen-container">
                      <img
                        src={img}
                        alt={nombre}
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

                      <div className="estado-badge">{estado}</div>
                    </div>

                    <div className="info-publicacion">
                      <h4>{nombre}</h4>
                      <p className="subtexto-card">
                        📍 {ciudad}, {pais}
                      </p>
                      <div className="autor-publicacion">
                        👤 {pub.autor || usuario?.Nombre}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ gridColumn: "1/-1", color: "#444" }}>
                No tenés favoritos todavía.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
