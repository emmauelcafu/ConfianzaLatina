import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importar el contexto
import '../assets/styles/CreateJob.css';

const CreateJob = () => {
  const { user } = useContext(UserContext); // Acceder al estado del usuario desde el contexto
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [salario, setSalario] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = user.token; // Usar el token del contexto
    if (!token) {
      setMessage('Error: No estás autenticado');
      navigate('/login'); // Redirigir al login si no hay token
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/trabajo`, {
        titulo,
        descripcion,
        empresa,
        ubicacion,
        salario
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Aquí actualizamos el estado del trabajo en la UI, si lo deseas
      setMessage('Trabajo publicado con éxito');
      setTimeout(() => {
        navigate('/'); // Redirige a la página de inicio después de un segundo
      }, 2000);
      
      // Si quieres, puedes actualizar el estado con el nuevo trabajo recibido
      // Esto depende de cómo estés gestionando la lista de trabajos en el frontend.
      // Por ejemplo, si tienes un estado de trabajos, actualízalo aquí.
  
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.mensaje || 'Algo salió mal'));
    }
  };
  

  return (
    <div className="create-job-container">
      <h1 className="text-center">Crear Publicación de Trabajo</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del trabajo"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del trabajo"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="empresa" className="form-label">Empresa</label>
          <input
            type="text"
            className="form-control"
            id="empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Nombre de la empresa"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ubicacion" className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            id="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            placeholder="Ubicación del trabajo"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salario" className="form-label">Salario</label>
          <input
            type="number"
            className="form-control"
            id="salario"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            placeholder="Salario ofrecido"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">Publicar Trabajo</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateJob;
