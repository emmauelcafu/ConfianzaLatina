import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { FiLock, FiMail } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import '../assets/styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    if (name === 'email') {
      if (!value) {
        newErrors.email = 'El email es requerido';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = 'Email inválido';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (!value) {
        newErrors.password = 'La contraseña es requerida';
      } else if (value.length < 6) {
        newErrors.password = 'Mínimo 6 caracteres';
      } else {
        delete newErrors.password;
      }
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
      const response = await axios.post(`${URL}/auth/login`, formData);
      
      if (response.data.token) {
        updateUser({
          role: response.data.role,
          name: response.data.nombre,
          token: response.data.token,
        });
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirigir a página específica
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const isValidEmail = validateField('email', formData.email);
    const isValidPassword = validateField('password', formData.password);
    return isValidEmail && isValidPassword;
  };

  const handleApiError = (error) => {
    const defaultMessage = 'Error de conexión. Intente nuevamente.';
    const apiMessage = error.response?.data?.mensaje;
    
    if (error.response?.status === 401) {
      setErrors({ general: 'Credenciales incorrectas' });
    } else {
      setErrors({ general: apiMessage || defaultMessage });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="form-title">Iniciar Sesión</h2>

        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email">
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
          <label htmlFor="password">
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

        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
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
            'Ingresar'
          )}
        </button>

        <div className="form-footer">
          <span>¿No tienes cuenta? </span>
          <Link to="/register" className="auth-link">
            Regístrate aquí
          </Link>
        </div>

        <div className="password-reset">
          <Link to="/forgot-password" className="auth-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
