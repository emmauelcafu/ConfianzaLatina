const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario'); // Importar el modelo Usuario

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
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Usuario obligatorio
    references: {
      model: Usuario, // Modelo asociado
      key: 'id',      // Llave primaria de Usuario
    },
    onDelete: 'CASCADE', // Elimina el perfil si el usuario se elimina
    onUpdate: 'CASCADE', // Actualiza el perfil si el usuario cambia
  },
});

// Relación con Usuario
Usuario.hasOne(PerfilUsuario, { foreignKey: 'usuarioId', as: 'perfil' });
PerfilUsuario.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = PerfilUsuario;
