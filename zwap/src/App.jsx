import './index.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import {Formulario}   from './components/Step1/Formulario/Formulario';
import  Step2  from './components/Step2/Step2'; 

function App() {  
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Formulario />} />
          <Route path="/step2" element={<Step2 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
