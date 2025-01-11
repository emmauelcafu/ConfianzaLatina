import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    updateUser(null); // Limpia el estado del usuario
    navigate('/login'); // Redirige al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Confianza Latina</Link>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Presentación</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/home">Home</Link>
            </li>
            {!user?.role ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                {user?.role === 'empresa' && (
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/createJob">Publicar Trabajo</Link>
                  </li>
                )}
                {(user?.role === 'admin' || user?.role === 'empresa') && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/crearNoticias">Crear Noticias</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/consultarNoticias">Consultar Noticias</Link>
                    </li>
                  </>
                )}
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle text-white"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hola, {user.name}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/perfilUsuario">Perfil</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/editarPerfil">Editar Perfil</Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
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

export default Nav;
