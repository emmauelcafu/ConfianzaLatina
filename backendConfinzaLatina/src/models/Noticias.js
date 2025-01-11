const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Noticia = sequelize.define('Noticia', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false, // Obligatorio
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false, // Obligatorio
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false, // Obligatorio
  },
  imagenRuta: {
    type: DataTypes.STRING, // Ruta de la imagen
    allowNull: false, // Ahora es obligatorio
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Noticia;
