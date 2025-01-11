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
  const [loading, setLoading] = useState(false);

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

        // Acceder directamente al perfil sin el .find()
        const perfilUsuario = response.data;  // Asume que es un solo objeto
        if (perfilUsuario) {
          setPerfil({
            nacionalidad: perfilUsuario.nacionalidad,
            pasaporte: perfilUsuario.pasaporte,
            numeroTelefono: perfilUsuario.numeroTelefono,
            disponibilidad: perfilUsuario.disponibilidad,
            edad: perfilUsuario.edad,
            sexo: perfilUsuario.sexo,
            idioma: perfilUsuario.idioma,
          });
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
    setLoading(true);  // Estado de carga

    const token = localStorage.getItem('token');
    try {
      const response = await axios.put('http://localhost:5000/perfilUsuario', perfil, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.data.mensaje === 'Perfil actualizado') {
        setMessage('Perfil actualizado correctamente');
        navigate('/perfilUsuario');
      } else {
        setMessage('Error al actualizar el perfil');
      }
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    } finally {
      setLoading(false);  // Finaliza el estado de carga
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
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditarPerfil;

