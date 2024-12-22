const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('../models/Usuario');
const Trabajo = require('../models/trabajos');

class Postulacion extends Model {}

Postulacion.init({
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trabajoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente', // Estado por defecto de la postulación
  },
}, {
  sequelize,
  modelName: 'Postulacion',
  tableName: 'Postulaciones',
  timestamps: true,
});

Postulacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Postulacion.belongsTo(Trabajo, { foreignKey: 'trabajoId' });

module.exports = Postulacion;
