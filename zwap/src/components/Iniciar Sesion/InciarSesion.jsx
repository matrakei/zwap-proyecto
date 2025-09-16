import './IniciarSesion.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';

export function IniciarSesion() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Home"); 
  };

  const handleRegistrarse = () => {
    navigate("/"); 
  };

  const handleRecuperarCuenta = (e) => {
    e.preventDefault();
    navigate("/recuperarcuenta"); 
  };

  return (
    <div className="registro-container login-page">
      {/* Columna Izquierda - Formulario */}
      <div className="col-izquierda-iniciar">
        <h2>Iniciar Sesión</h2>

        <div className="social-icons">
          <button><img src={googleIcon} alt="Google" /></button>
          <button><img src={microsoftIcon} alt="Microsoft" /></button>
          <button><img src={appleIcon} alt="Apple" /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button
            type="button"
            className="btn-recuperar"
            onClick={handleRecuperarCuenta}
          >
            ¿Olvidaste tu contraseña?
          </button>
          <button type="submit" className="btn-confirmar">Confirmar</button>
        </form>
      </div>

      {/* Columna Derecha - Mensaje */}
      <div className="col-derecha-iniciar">
        <h1>¡Bienvenido!</h1>
        <p>
          Ingrese sus datos personales para usar todas las funciones de la plataforma
        </p>
        <button 
          className="btn-registrarse" 
          onClick={handleRegistrarse}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default IniciarSesion;
