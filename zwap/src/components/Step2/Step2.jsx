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
            <option>2</option>
            <option>3</option>
            <option>4+</option>
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
          Seleccioná el N° de metros cuadrados
          <input type="text" placeholder="Type here..." />
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

      <div className="steps">
  {Array.from({ length: 5 }).map((_, i) => (
    <div
      key={i}
      className={`step ${i === 1 ? 'active' : ''} ${i < 1 ? 'done' : ''}`}
    >
      <div className="circle">
        {i < 1 ? '✔️' : ''}
      </div>
      <span>Step {i + 1}</span>
    </div>
  ))}
  </div>
    </div>
  );
}
