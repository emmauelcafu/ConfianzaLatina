import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { HiUserCircle, HiLogout } from 'react-icons/hi';
import { FaBriefcase, FaNewspaper } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/Navbar.css'; // Archivo CSS personalizado

const Navbar = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    updateUser(null); // Limpia el estado del usuario
    navigate('/login'); // Redirige al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <span className="h3 text-primary fw-bold">Confianza Latina</span>
        </Link>

        {/* Botón de menú móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú principal */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Enlaces comunes */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Presentación
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>

            {/* Condicionales según el rol del usuario */}
            {!user?.role ? (
              <>
                {/* Usuario no autenticado */}
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Usuario autenticado */}
                {user?.role === 'empresa' && (
                  <li className="nav-item">
                    <Link className="nav-link d-flex align-items-center gap-2" to="/createJob">
                      <FaBriefcase />
                      Publicar Trabajo
                    </Link>
                  </li>
                )}

                {(user?.role === 'admin' || user?.role === 'empresa') && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center gap-2" to="/crearNoticias">
                        <FaNewspaper />
                        Crear Noticias
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link d-flex align-items-center gap-2" to="/consultarNoticias">
                        Consultar Noticias
                      </Link>
                    </li>
                  </>
                )}

                {/* Opciones comunes para todos los usuarios autenticados */}
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle rounded-pill px-4"
                    id="userMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hola, {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                    <li>
                      <Link className="dropdown-item" to="/perfilUsuario">
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/editarPerfil">
                        Editar Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger d-flex align-items-center gap-2"
                        onClick={handleLogout}
                      >
                        <HiLogout />
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
