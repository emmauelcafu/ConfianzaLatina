import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import '../src/App.css'; // Importamos los estilos globales

function App() {
  return (
    <Router>
      {/* Barra de navegación */}
      <Nav />
      
      {/* Rutas de la aplicación */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
