import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/PerfilUsuario.css';

const PerfilUsuario = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nacionalidad: '',
    pasaporte: '',
    numeroTelefono: '',
    disponibilidad: '',
    edad: '',
    sexo: '',
    idiomas: [], // Array para idiomas
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newIdioma, setNewIdioma] = useState('');

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Por favor, inicia sesión');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/perfilUsuario`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const perfilUsuario = response.data;
        console.log('Perfil recibido:', perfilUsuario);
        if (perfilUsuario && perfilUsuario.usuarioId === user.id) {
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

    let errorMessage = '';
    if (!perfil.nacionalidad) errorMessage += 'Nacionalidad, ';
    if (!perfil.pasaporte) errorMessage += 'Pasaporte, ';
    if (!perfil.numeroTelefono) errorMessage += 'Número de Teléfono, ';
    if (!perfil.disponibilidad) errorMessage += 'Disponibilidad, ';
    if (!perfil.edad) errorMessage += 'Edad, ';
    if (!perfil.sexo) errorMessage += 'Sexo, ';
    if (perfil.idiomas.length === 0) errorMessage += 'Idiomas, ';

    if (errorMessage) {
      setMessage(`Los siguientes campos son obligatorios: ${errorMessage.slice(0, -2)}`);
      return;
    }

    if (perfil.edad <= 0) {
      setMessage('La edad debe ser mayor a 0');
      return;
    }

    if (!perfil.id && !perfil.usuarioId) {
      setMessage('No se pudo encontrar el perfil para actualizar');
      return;
    }

    try {
      const perfilId = perfil.id || perfil.usuarioId;
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/perfilUsuario/${perfilId}`, perfil, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
        console.log('Respuesta del backend:', response.data); // Verifica la respuesta aquí
      setMessage('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    }
  };

  const addIdioma = () => {
    if (newIdioma && !perfil.idiomas.includes(newIdioma)) {
      setPerfil({ ...perfil, idiomas: [...perfil.idiomas, newIdioma] });
      setNewIdioma('');
    } else {
      setMessage('Idioma ya añadido o no válido');
    }
  };

  const removeIdioma = (idioma) => {
    setPerfil({ ...perfil, idiomas: perfil.idiomas.filter(i => i !== idioma) });
  };

  return (
    <div className="perfilusuario-container">
      <h1 className="text-center">Perfil de Usuario</h1>
      {message && <p className="message">{message}</p>}

      {!isEditing ? (
        <div className="perfil-details">
          {perfil.nacionalidad ? <p><strong>Nacionalidad:</strong> {perfil.nacionalidad}</p> : <p><strong>Nacionalidad:</strong> No disponible</p>}
          {perfil.pasaporte ? <p><strong>Pasaporte:</strong> {perfil.pasaporte}</p> : <p><strong>Pasaporte:</strong> No disponible</p>}
          {perfil.numeroTelefono ? <p><strong>Número de Teléfono:</strong> {perfil.numeroTelefono}</p> : <p><strong>Número de Teléfono:</strong> No disponible</p>}
          {perfil.disponibilidad ? <p><strong>Disponibilidad:</strong> {perfil.disponibilidad}</p> : <p><strong>Disponibilidad:</strong> No disponible</p>}
          {perfil.edad ? <p><strong>Edad:</strong> {perfil.edad}</p> : <p><strong>Edad:</strong> No disponible</p>}
          {perfil.sexo ? <p><strong>Sexo:</strong> {perfil.sexo === 'F' ? 'Femenino' : 'Masculino'}</p> : <p><strong>Sexo:</strong> No disponible</p>}
          {perfil.idiomas.length > 0 ? (
            <p><strong>Idiomas:</strong> {perfil.idiomas.join(', ')}</p>
          ) : (
            <p><strong>Idiomas:</strong> No disponibles</p>
          )}

          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Editar Perfil</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="perfil-form container mt-4 p-4 shadow-lg rounded bg-light">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nacionalidad">Nacionalidad</label>
                <select
                  id="nacionalidad"
                  value={perfil.nacionalidad}
                  onChange={(e) => setPerfil({ ...perfil, nacionalidad: e.target.value })}
                  className="form-control"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Colombiana">Colombiana</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Brasilera">Brasilera</option>
                  <option value="Mexicana">Mexicana</option>
                  <option value="Chilena">Chilena</option>
                  <option value="Peruana">Peruana</option>
                  <option value="Ecuatoriana">Ecuatoriana</option>
                  <option value="Uruguaya">Uruguaya</option>
                  <option value="Venezolana">Venezolana</option>
                  <option value="Polaca">Polaca</option>
                  <option value="Ucraniana">Ucraniana</option>
                  <option value="Española">Española</option>
                  <option value="Francesa">Francesa</option>
                  <option value="Italiana">Italiana</option>
                  <option value="Alemana">Alemana</option>
                  <option value="Inglesa">Inglesa</option>
                  <option value="Portuguesa">Portuguesa</option>
                  <option value="Rusa">Rusa</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="idiomas">Idioma</label>
                <div className="d-flex">
                  <select
                    id="idiomas"
                    value={newIdioma}
                    onChange={(e) => setNewIdioma(e.target.value)}
                    className="form-control mr-2"
                  >
                    <option value="">Selecciona un idioma</option>
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Polaco">Polaco</option>
                    <option value="Francés">Francés</option>
                  </select>
                  <button type="button" className="btn btn-secondary" onClick={addIdioma}>Agregar</button>
                </div>
              </div>
              <div>
                <ul>
                  {perfil.idiomas.map((idioma, index) => (
                    <li key={index}>
                      {idioma} <button type="button" onClick={() => removeIdioma(idioma)} className="btn btn-danger btn-sm ml-2">Eliminar</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="pasaporte">Pasaporte</label>
                <input
                  id="pasaporte"
                  type="text"
                  className="form-control"
                  value={perfil.pasaporte}
                  onChange={(e) => setPerfil({ ...perfil, pasaporte: e.target.value })}
                  placeholder="Número de pasaporte"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="numeroTelefono">Número de Teléfono</label>
                <input
                  id="numeroTelefono"
                  type="text"
                  className="form-control"
                  value={perfil.numeroTelefono}
                  onChange={(e) => setPerfil({ ...perfil, numeroTelefono: e.target.value })}
                  placeholder="Número de teléfono"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="disponibilidad">Disponibilidad</label>
                <select
                  id="disponibilidad"
                  value={perfil.disponibilidad}
                  onChange={(e) => setPerfil({ ...perfil, disponibilidad: e.target.value })}
                  className="form-control"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Inmediata">Inmediata</option>
                  <option value="1 mes">1 mes</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="edad">Edad</label>
                <input
                  id="edad"
                  type="number"
                  className="form-control"
                  value={perfil.edad}
                  onChange={(e) => setPerfil({ ...perfil, edad: e.target.value })}
                  placeholder="Edad"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="sexo">Sexo</label>
                <select
                  id="sexo"
                  value={perfil.sexo}
                  onChange={(e) => setPerfil({ ...perfil, sexo: e.target.value })}
                  className="form-control"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
            </div>
            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>Cancelar</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PerfilUsuario;
