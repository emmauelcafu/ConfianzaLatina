const Usuario = require('./Usuario');
const Reporte = require('./Reporte');
const Trabajo = require('./trabajos'); // Agregar esta línea

// Definir relaciones
Usuario.hasMany(Reporte, { foreignKey: 'usuarioId' });
Reporte.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Exportar los modelos
module.exports = {
    Usuario,
    Reporte,
    Trabajo, // Exportar Trabajo
};
