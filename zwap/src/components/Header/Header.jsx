import './Header.css';
import logo from "../../assets/logo.png";
import perfil from "../../assets/perfil.png";
import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  // Detectar si estamos dentro de la sección "perfil" (steps)
  const isPerfilActive = location.pathname.startsWith('/perfil');

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo Zwap" className="logo" />
      </div>

      <nav className="nav-center">
        <NavLink to="/" className="nav-button">🏠 Home</NavLink>
        <NavLink to="/favoritos" className="nav-button">🤍 Favoritos</NavLink>
        <NavLink to="/perfil/step1" className={`nav-button ${isPerfilActive ? 'active' : ''}`}>
          👤 Perfil
        </NavLink>
      </nav>

      <div className="user-info">
        <button className="perfil-button">
          Nombre y apellido
          <img src={perfil} alt="Perfil" className="perfil-img" />
        </button>
      </div>
    </header>
  );
};
