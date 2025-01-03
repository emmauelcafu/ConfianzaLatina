const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./src/config/db'); // Asegúrate de conectar la base de datos

const authRoutes = require('./src/routes/auth');
const reportRoutes = require('./src/routes/reportes');
const trabajoRoutes = require('./src/routes/trabajos');
const adminRoutes  = require('./src/routes/adminRoutes');
const empresaRoutes = require('./src/routes/empresaRoutes');
const perfilUsuario = require('./src/routes/perfilUsuarioRoutes');
const postulaciones = require('./src/routes/postulacionesRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json());

// rutas 
app.use('/auth', authRoutes);
app.use('/reportes', reportRoutes);
app.use('/trabajo', trabajoRoutes);
app.use('/admin', adminRoutes);
app.use('/empresa', empresaRoutes);
app.use('/perfilUsuario', perfilUsuario);
app.use('/postulaciones', postulaciones);

// Sincronizar la base de datos antes de iniciar el servidor
(async () => {
    try {
        await sequelize.sync({ force: true }); // Usa force: true SOLO en desarrollo (elimina y recrea tablas)
        console.log('Base de datos sincronizada');

        // Inicia el servidor solo después de sincronizar la base de datos
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
})();
