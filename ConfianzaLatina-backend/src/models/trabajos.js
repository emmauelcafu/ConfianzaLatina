const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajusta la ruta de la configuración de tu base de datos

class Trabajo extends Model {}

Trabajo.init({
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresa: {
    type: DataTypes.STRING, // Definiendo la columna empresa
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Trabajo',
  tableName: 'Trabajos', // Especificando el nombre de la tabla
  timestamps: true, // Si estás usando createdAt y updatedAt
});

module.exports = Trabajo;
