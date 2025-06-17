import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <h1 className="titulo">Zwap</h1>
      
      <div className="buttons-right">
        <button className="home-button">Home</button>
        <button className="perfil-button">Nombre y apellido</button>
      </div>
    </header>
  );
}
