import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté importado
import { useState } from 'react';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold' }}>MyApp</Link>
        
        {/* Botón de menú (hamburguesa) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu} // Cuando se hace clic, se ejecuta la función toggleMenu
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú desplegable */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;


  
