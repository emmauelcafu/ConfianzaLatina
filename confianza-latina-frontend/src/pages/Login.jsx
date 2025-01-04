import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import '../assets/styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);


  const validateForm = () => {
    if (!email || !password) {
      setMessage('Por favor ingrese ambos campos.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
     
      
      if (response.data.token) {
        updateUser({
          role: response.data.role,
          name: response.data.nombre,
          token: response.data.token,
        
        });
       
        
        localStorage.setItem('token', response.data.token);
        

        navigate('/'); // Asegúrate de que la ruta de destino sea '/'
      } else {
        setMessage('Error: ' + response.data.mensaje);
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.mensaje || 'Algo salió mal'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container container">
      <h1 className="text-center mb-4">Iniciar sesión</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escribe tu correo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe tu contraseña"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>

      <div className="text-center mt-3">
        <p>
          ¿No tienes cuenta?{' '}
          <a href="/register" className="register-link">Regístrate aquí</a>
        </p>
      </div>

      {message && <p className="message text-danger text-center">{message}</p>}
    </div>
  );
};

export default Login;
