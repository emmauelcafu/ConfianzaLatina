const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajusta la ruta de la configuración de tu base de datos
const Usuario = require('../models/Usuario'); // Ajusta la ruta de tu modelo de Usuario

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
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Referencia al modelo Usuario
      key: 'id', // La columna en la tabla de Usuarios que estamos referenciando
    },
    onDelete: 'CASCADE', // Si el Usuario es eliminado, los trabajos asociados también lo serán
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activo',
  },
}, {
  sequelize,
  modelName: 'Trabajo',
  tableName: 'Trabajos', // Especificando el nombre de la tabla
  timestamps: true, // Si estás usando createdAt y updatedAt
});

// Relación de 'Trabajo' con 'Usuario'
Trabajo.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Trabajo;
