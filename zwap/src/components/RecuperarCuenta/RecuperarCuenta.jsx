import './RecuperarCuenta.css';
import { useNavigate } from 'react-router-dom';
import candadoIcon from '../../assets/candado.png'; 

export function RecuperarCuenta() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/iniciarsesion"); 
  };

  const handleRegistrarse = () => {
    navigate("/"); 
  };

  return (
    <div className="registro-container login-page">
      {/* Columna Izquierda - Formulario */}
      <div className="col-izquierda-recuperar">
        <img src={candadoIcon} alt="Candado" className="candado-icon" />
        <h2>Recuperar cuenta</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <a href="/" className="crear-cuenta">Crear cuenta nueva</a>
          <button type="submit" className="btn-confirmar">Confirmar</button>
        </form>
      </div>

      {/* Columna Derecha - Mensaje */}
      <div className="col-derecha-recuperar">
        <h1>¡Bienvenido!</h1>
        <p>
          Ingrese un Email para poder seguir usando las funciones de nuestra plataforma
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

export default RecuperarCuenta;
