import React, { useState } from 'react';
import '../../assets/styles/SearchBar.css';  // Estilo que ya mencionamos

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Maneja el cambio en el campo de búsqueda
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Maneja el submit del formulario de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Llama la función onSearch cuando el usuario envía el formulario
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="w-100">
        <input
          type="text"
          placeholder="Buscar trabajos..."
          className="form-control search-input"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;
