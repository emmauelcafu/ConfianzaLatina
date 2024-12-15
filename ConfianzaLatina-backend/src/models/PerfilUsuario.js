const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');

const PerfilUsuario = sequelize.define('PerfilUsuario', {
  nacionalidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pasaporte: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numeroTelefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  disponibilidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idioma: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Relación con Usuario
Usuario.hasOne(PerfilUsuario, { foreignKey: 'usuarioId', as: 'perfil' });
PerfilUsuario.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = PerfilUsuario;
