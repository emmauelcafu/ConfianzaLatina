const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./src/config/db'); // Asegúrate de conectar la base de datos

const authRoutes = require('./src/routes/auth');
const reportRoutes = require('./src/routes/reportes');
const trabajoRoutes = require('./src/routes/trabajos')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/reportes', reportRoutes);
app.use('/trabajo',trabajoRoutes )

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
