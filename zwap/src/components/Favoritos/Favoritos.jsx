  import "./Favoritos.css";
  import { useEffect, useState } from "react";

  export function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

    useEffect(() => {
      if (!usuario?.CorreoElectronico) return;

      const fetchFavoritos = async () => {
        try {
          const res = await fetch(`http://localhost:3001/api/favoritos/${usuario.CorreoElectronico}`);
          if (!res.ok) throw new Error("Error al obtener favoritos");

          const data = await res.json();
          setFavoritos(data);
        } catch (err) {
          console.error("❌ Error cargando favoritos:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchFavoritos();
    }, [usuario]);

    if (loading) return <p className="loading">Cargando favoritos...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
      <div className="favoritos-container">
        <h2>Mis Favoritos ❤️</h2>
        {favoritos.length === 0 ? (
          <p>No tenés publicaciones en favoritos todavía.</p>
        ) : (
          <div className="grid-favoritos">
            {favoritos.map((pub) => (
              <div key={pub.id} className="card-favorito">
                <img
                  src={
                    pub.Imagenes?.[0] ||
                    pub.imagenes?.[0] ||
                    "https://via.placeholder.com/300x200?text=Sin+Imagen"
                  }
                  alt={pub.Nombre || "Propiedad"}
                  className="img-favorito"
                />
                <div className="info-favorito">
                  <h4>{pub.NombrePropiedad || pub.Nombre || "Propiedad sin nombre"}</h4>
                  <p>📍 {pub.CiudadLocalidad || pub.Ciudad}, {pub.Pais}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  export default Favoritos;
