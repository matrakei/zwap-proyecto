import './Header.css';
import logo from "../../assets/Group 13.png";
import perfilImageDefault from "../../assets/Fotos de prueba/perfil.png";
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Header = () => {
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  const isPerfilActive = location.pathname.startsWith('/perfil');

  // 🟢 cargar usuario del localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioLogueado");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  // 🟢 imagen real del usuario si tiene, sino default
  const imagenPerfil =
    usuario?.Imagenes?.length > 0
      ? usuario.Imagenes[0]
      : perfilImageDefault;

  return (
    <header className="header">

      {/* LOGO */}
      <div className="logo-container">
        <img src={logo} alt="Logo Zwap" className="logo" />
      </div>

      {/* NAV */}
      <nav className="nav-center">
        <NavLink to="/home" className="nav-button">
          <span className="fluent--home-48-regular"></span> Home
        </NavLink>
        <NavLink to="/favoritos" className="nav-button">
          <span className="ion--heart-outline"></span> Favoritos
        </NavLink>
        <NavLink
          to="/perfil"
          className={`nav-button ${isPerfilActive ? 'active' : ''}`}
        >
          <span className="material-symbols--person-rounded"></span> Perfil
        </NavLink>
      </nav>

      {/* USUARIO */}
      <div className="user-info">
        {usuario ? (
          <NavLink to="/perfil" className="perfil-button">
            {usuario.NombreUsuario}
            <img src={imagenPerfil} alt="Perfil" className="perfil-img" />
          </NavLink>
        ) : (
          <NavLink to="/iniciarsesion" className="perfil-button">
            Iniciar sesión
          </NavLink>
        )}
      </div>

    </header>
  );
};
