const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa tu instancia de Sequelize
const Reporte = require('./Reporte'); // Importa el modelo Reporte

// Define el modelo Usuario
const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Define la relación
Usuario.hasMany(Reporte, { foreignKey: 'usuarioId', as: 'reportes' });
Reporte.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = Usuario;
