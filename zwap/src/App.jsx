import './index.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import {Formulario}   from './components/Step1/Formulario/Formulario';
import Step2  from './components/Step2/Step2'; 
import Step3 from './components/Step3/Step3';
import Step4 from './components/Step4/Step4';
import Step5 from './components/Step5/Step5';
import {PerfilPrincipal} from './components/PerfilPrincipal/PerfilPrincipal';
import { Login } from './components/Login/Login';



function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/favoritos" element={<div>Favoritos</div>} />
          <Route path="/perfil" element={<PerfilPrincipal />} />
          <Route path="/perfil/step1" element={<Formulario />} />
          <Route path="/perfil/step2" element={<Step2 />} />
          <Route path="/perfil/step3" element={<Step3 />} />
          <Route path="/perfil/step4" element={<Step4 />} />
          <Route path="/perfil/step5" element={<Step5 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
} 

export default App;
