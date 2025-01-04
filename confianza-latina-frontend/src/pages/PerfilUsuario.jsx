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
    disponibilidad: '', // Esto debe ser una opción de desplegable
    edad: '',
    sexo: '',
    idiomas: [], // Array para idiomas
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newIdioma, setNewIdioma] = useState(''); // Variable para el nuevo idioma

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
  
    // Validación de campos obligatorios
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
  
    // Validación de edad (debe ser mayor a 0)
    if (perfil.edad <= 0) {
      setMessage('La edad debe ser mayor a 0');
      return;
    }
  
    // Verificar si el ID está presente antes de enviar la solicitud
    if (!perfil.id) {
      setMessage('No se pudo encontrar el perfil para actualizar');
      return;
    }
  
    try {
      await axios.put(`http://localhost:5000/perfilUsuario/${perfil.id}`, perfil, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    }
  };
  

  const addIdioma = () => {
    if (newIdioma && !perfil.idiomas.includes(newIdioma)) {
      setPerfil({ ...perfil, idiomas: [...perfil.idiomas, newIdioma] });
      setNewIdioma(''); // Limpiar el input después de añadir el idioma
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
                  <option value="Argentina">Argentina</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Honduras">Honduras</option>
                  <option value="México">México</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Panamá">Panamá</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Perú">Perú</option>
                  <option value="República Dominicana">República Dominicana</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Venezuela">Venezuela</option>
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
                    <option value="Portugués">Portugués</option>
                    <option value="Francés">Francés</option>
                    <option value="Alemán">Alemán</option>
                    <option value="Italiano">Italiano</option>
                    <option value="Polaco">Polaco</option>
                    <option value="Ucraniano">Ucraniano</option>
                    <option value="Ruso">Ruso</option>
                    <option value="Árabe">Árabe</option>
                    <option value="Chino Mandarín">Chino Mandarín</option>
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
                  type="text"
                  id="pasaporte"
                  value={perfil.pasaporte}
                  onChange={(e) => setPerfil({ ...perfil, pasaporte: e.target.value })}
                  placeholder="Ingrese su número de pasaporte"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="numeroTelefono">Número de Teléfono</label>
                <input
                  type="text"
                  id="numeroTelefono"
                  value={perfil.numeroTelefono}
                  onChange={(e) => setPerfil({ ...perfil, numeroTelefono: e.target.value })}
                  placeholder="Ingrese su número de teléfono"
                  className="form-control"
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
                  <option value="">Selecciona disponibilidad</option>
                  <option value="Disponible">Disponible</option>
                  <option value="No disponible">No disponible</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="edad">Edad</label>
                <input
                  type="number"
                  id="edad"
                  value={perfil.edad}
                  onChange={(e) => setPerfil({ ...perfil, edad: e.target.value })}
                  placeholder="Ingrese su edad"
                  className="form-control"
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
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
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
