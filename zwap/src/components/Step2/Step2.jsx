import './Step2.css';

export default function Step2() {
  return (
    <div className="step2-container">
      <h2 className="step2-title">Características del hogar</h2>

      <form className="step2-form">
        <label>
          Sobre la propiedad
          <select>
            <option>Seleccioná el N° de ambientes</option>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </label>

        <label>
          <select>
            <option>Seleccioná el N° de pisos</option>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </label>

        <label>
          <select>
            <option>Seleccioná el N° de metros cuadrados</option>
            <option>10</option>
            <option>20</option>
            <option>30+</option>
          </select>
        </label>

        <label>
          Nombre (Opcional)
          <input type="text" placeholder="Type here..." />
        </label>

        <label>
          Breve descripción
          <input type="text" placeholder="Type here..." />
        </label>

        <button type="submit" className="step2-button">Siguiente</button>
      </form>

      <div className="step-indicator">
        <span className="step done">✔</span>
        <span className="step current">●</span>
        <span className="step">○</span>
        <span className="step">○</span>
        <span className="step">○</span>
      </div>
    </div>
  );
}
