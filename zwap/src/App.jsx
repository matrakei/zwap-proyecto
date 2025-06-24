import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Formulario } from './components/Formulario/Formulario';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Formulario />
      </main>
      <Footer />
    </div>
  );
}

export default App;
