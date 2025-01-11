import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/LandingPage.css'; // Archivo CSS personalizado
import '@fortawesome/fontawesome-free/css/all.min.css';
import imagen1 from '../assets/images/flags/hero-bg.jpg.jpg';
import imagen2 from '../assets/images/flags/imagen2Header.jpg';
const URL = process.env.REACT_APP_API_URL

const PaginaPrincipal = () => {
  return (
    <div className="pagina-principal">
      {/* Sección de encabezado con slider de imágenes */}
      <header className="hero-section text-center text-white">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={imagen1} className="d-block w-100 hero-img" alt="Imagen1" />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
                <h1 className="display-4 fw-bold">Bienvenido a Confianza Latina</h1>
                <p className="lead">Conectamos personas y empleos en Polonia y Europa.</p>
                <Link to="/">
                  <button className="btn btn-primary btn-lg mt-3">Comienza Ahora</button>
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img src={imagen2} className="d-block w-100 hero-img" alt="Imagen 2" />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
                <h1 className="display-4 fw-bold">Confianza en cada paso</h1>
                <p className="lead">Ayudamos a encontrar tu próximo trabajo en Europa.</p>
                <Link to="/">
                  <button className="btn btn-primary btn-lg mt-3">Comienza Ahora</button>
                </Link>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </header>

      {/* Sección de misión, visión y valores */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-light">
              <div className="card-body">
                <h3 className="fw-bold">Nuestra Misión</h3>
                <p>Conectar personas con oportunidades laborales, promoviendo la diversidad e inclusión.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-light">
              <div className="card-body">
                <h3 className="fw-bold">Nuestra Visión</h3>
                <p>Ser la plataforma líder en Europa para la búsqueda de empleo, apoyando el crecimiento personal y profesional.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-light">
              <div className="card-body">
                <h3 className="fw-bold">Nuestros Valores</h3>
                <p>Compromiso, confianza y excelencia en cada interacción con nuestros usuarios.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección con banderas y expansión */}
      <section className="expansion-section bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Expandiéndonos en Europa</h2>
          <p>Ayudamos a encontrar trabajo en los siguientes países:</p>
          <div className="row justify-content-center mt-4">
            <div className="col-4 col-md-2 mb-3">
              <i className="flag-icon flag-icon-pl flag-hover" style={{ fontSize: '50px' }}></i>
            </div>
            <div className="col-4 col-md-2 mb-3">
              <i className="flag-icon flag-icon-de flag-hover" style={{ fontSize: '50px' }}></i>
            </div>
            <div className="col-4 col-md-2 mb-3">
              <i className="flag-icon flag-icon-gb flag-hover" style={{ fontSize: '50px' }}></i>
            </div>
            <div className="col-4 col-md-2 mb-3">
              <i className="flag-icon flag-icon-fr flag-hover" style={{ fontSize: '50px' }}></i>
            </div>
            <div className="col-4 col-md-2 mb-3">
              <i className="flag-icon flag-icon-es flag-hover" style={{ fontSize: '50px' }}></i>
            </div>
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="footer-section bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} Confianza Latina. Todos los derechos reservados.</p>
          <div className="social-icons d-flex justify-content-center">
            <a href="https://facebook.com" className="text-white mx-3" aria-label="Facebook">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://twitter.com" className="text-white mx-3" aria-label="Twitter">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="https://instagram.com" className="text-white mx-3" aria-label="Instagram">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaginaPrincipal;
