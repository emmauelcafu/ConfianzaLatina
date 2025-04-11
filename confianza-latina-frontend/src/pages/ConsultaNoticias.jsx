import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/ConsultarNoticias.css';

const URL = process.env.REACT_APP_API_URL;

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(`${URL}/noticias`);
        setNoticias(response.data);
      } catch (error) {
        setError('Error al cargar las noticias. Intente nuevamente.');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const formatImagePath = (path) => {
    if (!path) return '';
    return path.replace(/\\/g, '/');
  };

  const handleSelectNoticia = (id) => {
    const noticia = noticias.find((n) => n.id === id);
    setSelectedNoticia(noticia);
  };

  if (isLoading) {
    return <div className="loading">Cargando noticias...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="consultar-noticias-container">
      <h1 className="title">Noticias</h1>

      <div className="noticias-list">
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            className="noticia-card"
            onClick={() => handleSelectNoticia(noticia.id)}
          >
            {noticia.imagen && (
              <img
                src={formatImagePath(noticia.imagen)}
                alt={noticia.titulo}
                className="noticia-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <h2 className="noticia-title">{noticia.titulo}</h2>
            <p className="noticia-content">
              {noticia.contenido?.substring(0, 100) || 'Descripción no disponible'}...
            </p>
          </div>
        ))}
      </div>

      {selectedNoticia && (
        <div className="noticia-detalles">
          <button 
            className="close-button"
            onClick={() => setSelectedNoticia(null)}
          >
            ×
          </button>
          <h2>{selectedNoticia.titulo}</h2>
          {selectedNoticia.imagen && (
            <img
              src={formatImagePath(selectedNoticia.imagen)}
              alt={selectedNoticia.titulo}
              className="detalles-image"
            />
          )}
          <p><strong>Autor:</strong> {selectedNoticia.autor || 'Anónimo'}</p>
          <p><strong>Fecha:</strong> {new Date(selectedNoticia.fechaCreacion).toLocaleDateString()}</p>
          <p className="detalles-content">
            {selectedNoticia.contenido || 'Contenido no disponible'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Noticias;
