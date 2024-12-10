const { Sequelize } = require('sequelize');

// Configuración de la conexión a PostgreSQL
const sequelize = new Sequelize('confianza_latina', 'postgres', 'admin', {
    host: 'localhost',      // Cambia si usas una IP o servidor remoto
    dialect: 'postgres',    // Dialecto que estás usando
    port: 5432,             // Puerto de tu servidor PostgreSQL
    logging: false,         // Cambiar a true para ver las consultas SQL en la consola
});

// Probar la conexión
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos PostgreSQL.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
})();

module.exports = sequelize;
