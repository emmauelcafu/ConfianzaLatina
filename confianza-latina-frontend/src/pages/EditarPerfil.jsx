import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/PerfilUsuario.css';

const EditarPerfil = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nacionalidad: '',
    pasaporte: '',
    numeroTelefono: '',
    disponibilidad: '',
    edad: '',
    sexo: '',
    idioma: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Por favor, inicia sesión');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/perfilUsuario', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const perfilUsuario = response.data.find((p) => p.usuarioId === user.id);
        if (perfilUsuario) {
          setPerfil(perfilUsuario);
        } else {
          setMessage('Perfil no encontrado');
        }
      } catch (error) {
        setMessage('Error al cargar el perfil');
      }
    };

    if (user && user.id) {
      fetchPerfil();
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/perfilUsuario/${perfil.id}`, perfil, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Perfil actualizado correctamente');
      navigate('/perfilUsuario');
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    }
  };

  return (
    <div className="perfilusuario-container">
      <h1 className="text-center">Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nacionalidad"
          value={perfil.nacionalidad}
          onChange={(e) => setPerfil({ ...perfil, nacionalidad: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pasaporte"
          value={perfil.pasaporte}
          onChange={(e) => setPerfil({ ...perfil, pasaporte: e.target.value })}
        />
        <input
          type="text"
          placeholder="Número de Teléfono"
          value={perfil.numeroTelefono}
          onChange={(e) => setPerfil({ ...perfil, numeroTelefono: e.target.value })}
        />
        <input
          type="number"
          placeholder="Edad"
          value={perfil.edad}
          onChange={(e) => setPerfil({ ...perfil, edad: e.target.value })}
        />
        <select
          value={perfil.sexo}
          onChange={(e) => setPerfil({ ...perfil, sexo: e.target.value })}
        >
          <option value="F">Femenino</option>
          <option value="M">Masculino</option>
        </select>
        <input
          type="text"
          placeholder="Idioma"
          value={perfil.idioma}
          onChange={(e) => setPerfil({ ...perfil, idioma: e.target.value })}
        />
        <button type="submit">Guardar cambios</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditarPerfil;
