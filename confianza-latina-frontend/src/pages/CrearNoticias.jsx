import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importar el contexto
import '../assets/styles/CrearNoticias.css';

const URL = process.env.REACT_APP_API_URL;

const CrearNoticias = () => {
  const { user } = useContext(UserContext); // Acceder al estado del usuario desde el contexto
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    autor: '',
    imagen: null,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Manejo del estado de envío
  const navigate = useNavigate();

  const validateFields = () => {
    if (!formData.titulo || !formData.contenido || !formData.autor || !formData.imagen) {
      setError('Todos los campos son obligatorios, incluyendo la imagen.');
      return false;
    }
    if (formData.imagen && formData.imagen.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar los 5MB.');
      return false;
    }
    setError('');
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imagen: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const token = user?.token;
    if (!token) {
      setMessage('Error: No estás autenticado');
      navigate('/login'); // Redirigir al login si no hay token
      return;
    }

    // Crear el objeto FormData para enviar los datos y el archivo
    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('contenido', formData.contenido);
    data.append('autor', formData.autor);
    data.append('imagen', formData.imagen);

    try {
      setIsSubmitting(true);
      await axios.post(`${URL}/noticias/crear`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Si la noticia se crea con éxito
      setMessage('Noticia creada exitosamente');
      setTimeout(() => navigate('/consultarNoticias'), 2000); // Redirige después de un segundo
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.mensaje || 'Algo salió mal'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="crear-noticia-container">
      <form onSubmit={handleSubmit} className="crear-noticia-form">
        <h2 className="form-title">Crear Noticia</h2>

        {/* Campo Título */}
        <div className={`form-group ${error && !formData.titulo ? 'has-error' : ''}`}>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        {/* Campo Contenido */}
        <div className={`form-group ${error && !formData.contenido ? 'has-error' : ''}`}>
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            name="contenido"
            value={formData.contenido}
            onChange={handleInputChange}
            className="form-textarea"
          ></textarea>
        </div>

        {/* Campo Autor */}
        <div className={`form-group ${error && !formData.autor ? 'has-error' : ''}`}>
          <label htmlFor="autor">Autor</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        {/* Campo Imagen */}
        <div className={`form-group ${error && !formData.imagen ? 'has-error' : ''}`}>
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        {/* Mensajes */}
        {error && <div className="error-message">{error}</div>}
        {message && (
          <div className={`message ${message.includes('exitosamente') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {/* Botón Enviar */}
        <button type="submit" className={`submit-button ${isSubmitting ? 'disabled' : ''}`} disabled={isSubmitting}>
          {isSubmitting ? 'Creando...' : 'Crear Noticia'}
        </button>
      </form>
    </div>
  );
};

export default CrearNoticias;
