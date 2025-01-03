const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario'); // Asegúrate de que el modelo Usuario esté correctamente importado

class Trabajo extends Model {}

Trabajo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    empresa: {
      type: DataTypes.STRING,
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
        model: Usuario, // Este debe coincidir con el modelo Usuario
        key: 'id',
      },
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'activo',
    },
  },
  {
    sequelize,
    modelName: 'Trabajo',
    tableName: 'Trabajos', // Nombre de la tabla en plural
    timestamps: true, // createdAt y updatedAt
  }
);

// Asociación con el modelo Usuario
Trabajo.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = Trabajo;
