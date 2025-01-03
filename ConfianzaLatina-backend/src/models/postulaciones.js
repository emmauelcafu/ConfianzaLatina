const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Trabajo = require('./trabajos');

class Postulacion extends Model {}

Postulacion.init({
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  trabajoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Trabajo,
      key: 'id',
    },
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente',
  },
}, {
  sequelize,
  modelName: 'Postulacion',
});

Postulacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Postulacion.belongsTo(Trabajo, { foreignKey: 'trabajoId' });

module.exports = Postulacion;
