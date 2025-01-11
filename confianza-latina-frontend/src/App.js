import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import PerfilUsuario from './pages/PerfilUsuario';
import CreateJob from './pages/CreateJob';
import Nav from './components/Layout/Navbar'; // Asegúrate de importar el Nav
import LandingPage from './pages/LandingPage'
import CrearNoticias from './pages/CrearNoticias'
import ConsultarNoticias from './pages/ConsultaNoticias'
function App() {
  return (
    <Router>
      {/* Coloca el Nav fuera de las rutas para que se muestre siempre */}
      <Nav />
      
      <div className="container mt-5"> {/* Agrega algo de margen para separar el contenido del navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfilUsuario" element={<PerfilUsuario />} />
          <Route path="/createJob" element={<CreateJob />} /> {/* Corrige el nombre de la ruta a "createJob" */}
          <Route path="/crearNoticias" element={<CrearNoticias />} />
          <Route path="/consultarNoticias" element={<ConsultarNoticias />} />

          {/* <Route path="/EditarPerfil" element={<EditarPerfil />} /> */}
          <Route path="/landingPage" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

