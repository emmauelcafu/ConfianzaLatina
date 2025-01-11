import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/ConsultarNoticias.css';
const URL = process.env.REACT_APP_API_URL;

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [selectedNoticia, setSelectedNoticia] = useState(null); // Para los detalles de la noticia seleccionada
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(`${URL}/noticias`); // Endpoint para obtener noticias
        setNoticias(response.data); // Guardar las noticias en el estado
      } catch (error) {
        console.error('Error al obtener noticias', error);
      }
    };

    fetchNoticias(); // Llamar a la función para obtener las noticias
  }, []);

  const handleSelectNoticia = (id) => {
    // Filtrar la noticia seleccionada y establecerla en el estado
    const noticia = noticias.find((n) => n.id === id);
    setSelectedNoticia(noticia);
  };

  const formatImagePath = (path) => {
    // Reemplazar las barras invertidas por barras normales
    return path.replace(/\\/g, '/');
  };

  return (
    <div className="noticias-container">
      <h1 className="text-center">Noticias</h1>

      {/* Si se seleccionó una noticia, mostrar los detalles */}
      {selectedNoticia ? (
        <div className="noticia-detalle">
          <h2>{selectedNoticia.titulo}</h2>
          <img
            src={`${process.env.REACT_APP_API_URL}/${formatImagePath(selectedNoticia.imagenRuta)}`}
            alt={selectedNoticia.titulo}
          />
          <p>
            <strong>Autor:</strong> {selectedNoticia.autor}
          </p>
          <p>
            <strong>Fecha de creación:</strong> {new Date(selectedNoticia.fechaCreacion).toLocaleDateString()}
          </p>
          <p>{selectedNoticia.contenido}</p>
          <button onClick={() => setSelectedNoticia(null)} className="btn btn-secondary">
            Cerrar
          </button>
        </div>
      ) : (
        <div className="noticias-list">
          {noticias.map((noticia) => (
            <div
              key={noticia.id}
              className="noticia-item"
              onClick={() => handleSelectNoticia(noticia.id)}
            >
              <img
                src={`${process.env.REACT_APP_API_URL}/${formatImagePath(noticia.imagenRuta)}`}
                alt={noticia.titulo}
                className="noticia-img"
              />
              <h3>{noticia.titulo}</h3>
              <p>{noticia.contenido.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Noticias;
