import React, { useState } from 'react';
import '../../assets/styles/SearchBar.css'; // Importa los estilos

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
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleChange}
        aria-label="Buscar"
      />
      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
