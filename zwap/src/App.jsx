import './index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Formulario } from './components/Step1/Formulario/Formulario';
import Step2 from './components/Step2/Step2'; 
import Step3 from './components/Step3/Step3';
import Step4 from './components/Step4/Step4';
import Step5 from './components/Step5/Step5';
import { PerfilPrincipal } from './components/PerfilPrincipal/PerfilPrincipal';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Login2 } from './components/Login2/Login2';
import { Login3 } from './components/Login3/Login3';
import { Login4 } from './components/Login4/Login4';
import { Login5 } from './components/Login5/Login5';
import { Login6 } from './components/Login6/Login6';


function App() {
  const location = useLocation();

  
  const hideHeaderFooter = location.pathname === "/" 
  || location.pathname === "/login2"
  || location.pathname === "/login3"
  || location.pathname === "/login4"
  || location.pathname === "/login5"
  || location.pathname === "/login6"
  ;

  return (
    <div className="app-container">
      {!hideHeaderFooter && <Header />}
      
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/login3" element={<Login3 />} />
          <Route path="/login4" element={<Login4 />} />
          <Route path="/login5" element={<Login5 />} />
          <Route path="/login6" element={<Login6 />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favoritos" element={<div>Favoritos</div>} />
          <Route path="/perfil" element={<PerfilPrincipal />} />
          <Route path="/perfil/step1" element={<Formulario />} />
          <Route path="/perfil/step2" element={<Step2 />} />
          <Route path="/perfil/step3" element={<Step3 />} />
          <Route path="/perfil/step4" element={<Step4 />} />
          <Route path="/perfil/step5" element={<Step5 />} />
        </Routes>
      </main>
      
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
