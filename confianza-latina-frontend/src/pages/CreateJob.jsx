import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../assets/styles/CreateJob.css';

const URL = process.env.REACT_APP_API_URL;

const CreateJob = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    empresa: '',
    ubicacion: '',
    salario: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === 'titulo' && (!value || value.length < 3)) {
      newErrors.titulo = 'El título debe tener al menos 3 caracteres';
    } else {
      delete newErrors.titulo;
    }

    if (name === 'descripcion' && (!value || value.length < 10)) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    } else {
      delete newErrors.descripcion;
    }

    if (name === 'empresa' && !value) {
      newErrors.empresa = 'El nombre de la empresa es requerido';
    } else {
      delete newErrors.empresa;
    }

    if (name === 'ubicacion' && !value) {
      newErrors.ubicacion = 'La ubicación es requerida';
    } else {
      delete newErrors.ubicacion;
    }

    if (name === 'salario' && (!value || isNaN(value))) {
      newErrors.salario = 'El salario debe ser un número válido';
    } else {
      delete newErrors.salario;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    Object.keys(formData).forEach((field) => validateField(field, formData[field]));
    
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    
    try {
      const token = user.token;
      if (!token) {
        setMessage('Error: No estás autenticado');
        navigate('/login');
        return;
      }

      await axios.post(`${URL}/trabajo`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage('Trabajo publicado con éxito');
      setTimeout(() => navigate('/'), 2000);
      
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.mensaje || 'Algo salió mal'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-job-container">
      <form onSubmit={handleSubmit} className="create-job-form">
        <h2 className="form-title">Publicar Trabajo</h2>

        <div className={`form-group ${errors.titulo ? 'has-error' : ''}`}>
          <label htmlFor="titulo">Título del Trabajo</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.titulo && <span className="error-message">{errors.titulo}</span>}
        </div>

        <div className={`form-group ${errors.descripcion ? 'has-error' : ''}`}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            className="form-textarea"
          ></textarea>
          {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
        </div>

        <div className={`form-group ${errors.empresa ? 'has-error' : ''}`}>
          <label htmlFor="empresa">Nombre de la Empresa</label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.empresa && <span className="error-message">{errors.empresa}</span>}
        </div>

        <div className={`form-group ${errors.ubicacion ? 'has-error' : ''}`}>
          <label htmlFor="ubicacion">Ubicación</label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.ubicacion && <span className="error-message">{errors.ubicacion}</span>}
        </div>

        <div className={`form-group ${errors.salario ? 'has-error' : ''}`}>
          <label htmlFor="salario">Salario</label>
          <input
            type="number"
            id="salario"
            name="salario"
            value={formData.salario}
            onChange={handleInputChange}
            className="form-input"
          />
          {errors.salario && <span className="error-message">{errors.salario}</span>}
        </div>

        {message && (
          <div className={`message ${isSubmitting ? 'loading' : ''}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Trabajo'}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
