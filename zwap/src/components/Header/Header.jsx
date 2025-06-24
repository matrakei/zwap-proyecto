import './Header.css';
import logo from '../../assets/logo.png';
import perfil from '../../assets/perfil.png';

export const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo Zwap" className="logo" />
      </div>

      <div className="buttons-right">
        <button className="home-button">Home</button>
        <button className="perfil-button">
         Nombre y apellido
         <img src={perfil} alt="Perfil" className="perfil-img" />
        </button>

      </div>
    </header>
  );
};
