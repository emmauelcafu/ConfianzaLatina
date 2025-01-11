import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importar el contexto
import '../assets/styles/CrearNoticias.css';
const URL = process.env.REACT_APP_API_URL;
const CreateNoticia = () => {
  const { user } = useContext(UserContext); // Acceder al estado del usuario desde el contexto
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [autor, setAutor] = useState('');
  const [imagen, setImagen] = useState(null); // Para manejar la imagen
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Para manejar los errores
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si todos los campos están completos
    if (!titulo || !contenido || !autor || !imagen) {
      setError('Todos los campos son obligatorios, incluyendo la imagen.');
      return;
    }

    const token = user.token; // Usar el token del contexto
    if (!token) {
      setMessage('Error: No estás autenticado');
      navigate('/login'); // Redirigir al login si no hay token
      return;
    }

    // Crear el objeto FormData para enviar los datos y el archivo
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    formData.append('autor', autor);
    formData.append('imagen', imagen); // Agregar la imagen al FormData

    try {
      const response = await axios.post(`${URL}/noticias/crear`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Indicar que estamos enviando un formulario con archivos
        }
      });

      // Si la noticia se crea con éxito
      setMessage('Noticia creada exitosamente');
      setTimeout(() => {
        navigate('/consultarNoticias'); // Redirige a la página de inicio después de un segundo
      }, 2000);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.mensaje || 'Algo salió mal'));
    }
  };

  return (
    <div className="create-job-container">
      <h1 className="text-center">Crear Noticia</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título de la noticia"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contenido" className="form-label">Contenido</label>
          <textarea
            className="form-control"
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Contenido de la noticia"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="autor" className="form-label">Autor</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Autor de la noticia"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            onChange={(e) => setImagen(e.target.files[0])}
            required // Ahora es obligatorio
          />
        </div>
        <button type="submit" className="btn-success">Crear Noticia</button>
      </form>

      {error && <p className="text-danger">{error}</p>} {/* Mostrar error si algún campo está vacío */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateNoticia;
