import './index.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import {Formulario}   from './components/Step1/Formulario/Formulario';
import  Step2  from './components/Step2/Step2'; 
import Step3 from './components/Step3/Step3';
import Step4 from './components/Step4/Step4';

function App() {  
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
        <Route path="/" element={<div>Home</div>} /> 
        <Route path="/favoritos" element={<div>Favoritos</div>} />
          <Route path="perfil/step1" element={<Formulario />} />
          <Route path="perfil/step2" element={<Step2 />} />
          <Route path="perfil/step3" element={<Step3 />} />
          <Route path="perfil/step4" element={<Step4 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
