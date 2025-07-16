import './Step5.css';
import { useNavigate } from 'react-router-dom';

export default function Step5() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica de envío del formulario
    navigate('/perfil/step6'); 
  };

  return (
    <div className="step5-container">
      <div className="step5-header">
        <span className="etiqueta">DISPONIBLE PARA INTERCAMBIAR</span>
        <h2 className="step5-title">La aurora</h2>
        <p className="step5-location">📍 Luján de Cuyo, Mendoza, Argentina</p>
        <p className="step5-type">🏠 Tipo: Casa unifamiliar</p>
        <p className="step5-size">📐 Superficie: 120 m²</p>
      </div>

      <div className="step5-description">
        <p><strong>Descripción:</strong></p>
        <p>
          Nuestra casa está ubicada en plena ruta del vino, en una zona tranquila de Luján de Cuyo.
          Tiene capacidad cómoda para 4 personas, ideal para una familia o dos parejas.
        </p>
        <p>
          Cuenta con dos habitaciones: una con cama matrimonial y otra con dos camas individuales.
        </p>
        <p>
          El living comedor es amplio y muy luminoso, con aire acondicionado y estufa. La cocina está equipada con todo lo necesario para cocinar.
        </p>
        <p>
          También tiene un baño completo, patio con jardín, parrilla y una pileta perfecta para disfrutar en verano.
        </p>
        <p>
          Es un espacio cálido, cómodo y pensado para relajarse.
        </p>
      </div>

      <div className="step5-services"> 
       <p><strong>Servicios, comodidades y restricciones:</strong></p>
       <ul>
        <li><span className="mdi--tick"></span> Wi-Fi</li>
       <li><span className="mdi--tick"></span> Aire acondicionado</li>
       <li><span className="mdi--tick"></span> Calefacción</li>
       <li><span className="mdi--tick"></span> Cocina equipada</li>
       </ul>
      </div>


      <button className="step5-button">Publicar</button>

      <div className="steps">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`step ${i < 4 ? 'done' : ''} ${i === 4 ? 'active' : ''}`}
          >
            <div className="circle">{i < 4 ? '✔️' : ''}</div>
            <span>Step {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
