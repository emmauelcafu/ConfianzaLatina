import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Redirección
import '../assets/styles/Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('empresa');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/registro', { nombre, email, password, role });

      // Si la respuesta es exitosa, muestra un mensaje y redirige al login
      setMessage(response.data.mensaje);

      // Redirigir al login tras registro exitoso
      if (response.data.mensaje === 'Registro exitoso') {
        setTimeout(() => {
          navigate('/'); // Redirige al Login
        }, 2000); // Espera 2 segundos para mostrar el mensaje
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.mensaje || 'Algo salió mal'));
    }
  };

  return (
    <div className="register-container">
      <h1 className="text-center">Registro</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre"
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rol</label>
          <select
            id="role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="empresa">Empresa</option>
            <option value="empleado">Empleado</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>

      <div className="text-center mt-3">
        <p>
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="login-link">Inicia sesión aquí</a>
        </p>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;

