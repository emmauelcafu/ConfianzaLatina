const Usuario = require('./Usuario');
const Reporte = require('./Reporte');

// Definir relaciones
Usuario.hasMany(Reporte, { foreignKey: 'usuarioId' });
Reporte.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = {
    Usuario,
    Reporte,
};
