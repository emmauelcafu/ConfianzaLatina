const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables del archivo .env

// Configuración de la conexión a PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nombre de la base de datos
    process.env.DB_USER,       // Usuario
    process.env.DB_PASSWORD,   // Contraseña
    {
        host: process.env.DB_HOST,   // Host (localhost o IP del servidor)
        dialect: 'postgres',         // Dialecto que estás usando
        port: process.env.DB_PORT,   // Puerto de tu servidor PostgreSQL
        logging: false,              // Cambiar a true para ver las consultas SQL
    }
);

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
