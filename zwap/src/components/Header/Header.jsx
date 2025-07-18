import './Header.css';
import logo from "../../assets/logo con color.png";
import perfil from "../../assets/perfil.png";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detectar si estamos dentro de la sección "perfil" (steps)
  const isPerfilActive = location.pathname.startsWith('/perfil');

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo Zwap" className="logo" />
      </div>

      <nav className="nav-center">
        <NavLink to="/" className="nav-button">
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

      <div className="user-info">
        <button className="perfil-button">
          Nombre y apellido
          <img src={perfil} alt="Perfil" className="perfil-img" />
        </button>
      </div>
    </header>
  );
};
