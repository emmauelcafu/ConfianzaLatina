const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Trabajo = require('./Trabajo');
const Postulacion = require('./Postulacion');

// Registrar asociaciones
Usuario.hasMany(Postulacion, { foreignKey: 'usuarioId' });
Trabajo.hasMany(Postulacion, { foreignKey: 'trabajoId' });
Postulacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Postulacion.belongsTo(Trabajo, { foreignKey: 'trabajoId' });

module.exports = { sequelize, Usuario, Trabajo, Postulacion };
