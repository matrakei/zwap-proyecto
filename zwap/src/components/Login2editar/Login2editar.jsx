import './Login2editar.css';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/Login/google.png';
import microsoftIcon from '../../assets/Login/microsoft.png';
import appleIcon from '../../assets/Login/apple.png';
import { useState, useEffect } from 'react';

export function Login2editar() {
  const navigate = useNavigate();
  const [saludoIndex, setSaludoIndex] = useState(0);

  const saludos = [
    "¡Hola!", "¡Hello!", "¡Bonjour!", "¡Ciao!", "¡Hallo!",
    "¡Olá!", "¡Привет!", "¡こんにちは!", "¡مرحبا!", "¡你好!", "¡Shalom!"
  ];
 
  useEffect(() => {
    const interval = setInterval(() => {
      setSaludoIndex((prev) => (prev + 1) % saludos.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login3editar");
  };

  return (
    <div className="registro-container">
      {/* Columna Izquierda */}
      <div className="col-izquierda">
        <h1 className="saludo-animado">{saludos[saludoIndex]}</h1>
        <p>Editá tus datos para mantener tu perfil actualizado</p>
        <button className="btn-login" onClick={() => navigate("/perfil")}>
          Volver al Perfil
        </button>
      </div>

      {/* Columna Derecha */}
      <div className="col-derecha">
        <h2>Editar Perfil</h2>
        <div className="social-icons">
          <img src={googleIcon} alt="Google" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={appleIcon} alt="Apple" />
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Código de país" />
          <input type="text" placeholder="Número de teléfono" />
          <input type="text" placeholder="Nacionalidad" />
          <input type="text" placeholder="País de residencia" />
          <button type="submit" className="btn-siguiente">
            Guardar y Continuar
          </button>
        </form>

        <div className="steps">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`step ${i === 1 ? 'active' : ''}`}>
              <div className="circle" />
              <span>Step {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
