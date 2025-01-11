import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/Layout/SearchBar'; // Importa el componente SearchBar
import '../assets/styles/Home.css';

const Home = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [message, setMessage] = useState('');
  const [filteredTrabajos, setFilteredTrabajos] = useState([]); // Estado para trabajos filtrados

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/trabajo`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTrabajos(response.data);
        setFilteredTrabajos(response.data); // Establece los trabajos por defecto
      } catch (error) {
        setMessage('Error: ' + (error.response?.data?.mensaje || 'Algo salió mal'));
      }
    };

    fetchTrabajos();
  }, []);

  // Función para filtrar los trabajos según la búsqueda
  const handleSearch = (searchTerm) => {
    const filtered = trabajos.filter(trabajo =>
      trabajo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trabajo.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrabajos(filtered); // Actualiza los trabajos filtrados
  };

  return (
    <div className="home-container">
      <h1 className="text-center">Ofertas de Trabajo</h1>
      {message && <p className="message">{message}</p>}
      
      {/* Componente de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      <div className="trabajos-list">
        {filteredTrabajos.map((trabajo) => (
          <div className="card" key={trabajo.id}>
            <div className="card-body">
              <h2 className="card-title">{trabajo.titulo}</h2>
              <p><strong>Descripción:</strong> {trabajo.descripcion}</p>
              <p><strong>Empresa:</strong> {trabajo.empresa}</p>
              <p><strong>Ubicación:</strong> {trabajo.ubicacion}</p>
              <p><strong>Salario:</strong> ${trabajo.salario}</p>
              <button className="btn btn-primary">Aplicar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
