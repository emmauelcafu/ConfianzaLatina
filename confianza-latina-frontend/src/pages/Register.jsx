import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiBriefcase } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import '../assets/styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    role: 'empresa'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;

  // Validaciones en tiempo real
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch(name) {
      case 'nombre':
        if (!value.trim()) {
          newErrors.nombre = 'El nombre es requerido';
        } else if (value.length < 3) {
          newErrors.nombre = 'Mínimo 3 caracteres';
        } else {
          delete newErrors.nombre;
        }
        break;
        
      case 'email':
        if (!value) {
          newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Email inválido';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es requerida';
        } else if (value.length < 6) {
          newErrors.password = 'Mínimo 6 caracteres';
        } else {
          delete newErrors.password;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${URL}/auth/registro`, formData);
      
      if (response.data.mensaje === 'Registro exitoso') {
        setSubmitMessage('¡Registro exitoso! Redirigiendo...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const isValid = Object.keys(formData).every(field => {
      if (field === 'role') return true;
      return validateField(field, formData[field]);
    });
    return isValid;
  };

  const handleApiError = (error) => {
    const defaultMessage = 'Error en el registro. Intente nuevamente.';
    const apiMessage = error.response?.data?.mensaje;
    
    if (error.response?.status === 409) {
      setErrors({ email: 'Este email ya está registrado' });
    } else {
      setSubmitMessage(apiMessage || defaultMessage);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="form-title">Crear Cuenta</h2>

        <div className="form-group">
          <label htmlFor="role" className="form-label">
            <FiBriefcase className="input-icon" />
            Tipo de Cuenta
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="empresa">Empresa</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className={`form-group ${errors.nombre ? 'has-error' : ''}`}>
          <label htmlFor="nombre" className="form-label">
            <FiUser className="input-icon" />
            {formData.role === 'empresa' ? 'Nombre de la Empresa' : 'Nombre Completo'}
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="form-input"
            aria-describedby="nombreError"
          />
          {errors.nombre && (
            <span id="nombreError" className="error-message">
              {errors.nombre}
            </span>
          )}
        </div>

        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email" className="form-label">
            <FiMail className="input-icon" />
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            aria-describedby="emailError"
          />
          {errors.email && (
            <span id="emailError" className="error-message">
              {errors.email}
            </span>
          )}
        </div>

        <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
          <label htmlFor="password" className="form-label">
            <FiLock className="input-icon" />
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
            aria-describedby="passwordError"
          />
          {errors.password && (
            <span id="passwordError" className="error-message">
              {errors.password}
            </span>
          )}
        </div>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('éxito') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          {isSubmitting ? (
            <ClipLoader size={20} color="#ffffff" />
          ) : (
            'Registrarse'
          )}
        </button>

        <div className="auth-footer">
          <span>¿Ya tienes cuenta? </span>
          <Link to="/login" className="auth-link">
            Inicia sesión aquí
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
