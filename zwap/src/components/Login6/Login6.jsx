import './Login6.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';

export function Login6() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // evita que se recargue la página
    navigate("/home"); // te lleva a Home
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1>¡Hola!</h1>
        <p>
          Regístrese con sus datos personales para usar todas las funciones de
          la plataforma
        </p>
        <button className="btn-login">Iniciar Sesión</button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Registrarse</h2>
        <div className="social-icons">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Contraseña" />
          <input type="text" placeholder="Confirmar contraseña" />
          <button type="submit" className="btn-siguiente">
            Siguiente
          </button>
        </form>

        <div className="steps">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`step ${i < 2 ? 'done' : ''} ${i === 2 ? 'active' : ''}`}
            >
              <div className="circle">{i < 2 ? '✓' : ''}</div>
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
