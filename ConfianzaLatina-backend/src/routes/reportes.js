const express = require('express');
const Reporte = require('../models/Reporte');
const {verifyToken} = require('../middlewares/auth');

const router = express.Router();

// Ruta para crear un reporte
router.post('/', verifyToken, async (req, res) => {
    const { descripcion, ubicacion } = req.body;  // Tomar solo los datos que se necesitan
    try {
        // Crear el nuevo reporte
        const nuevoReporte = await Reporte.create({
            descripcion,
            ubicacion, // Si lo envías, se incluirá
            usuarioId: req.user.id,  // Obtener el ID del usuario del token
        });
        res.status(201).json({ mensaje: 'Reporte creado', reporte: nuevoReporte });
    } catch (error) {
        // Manejar errores, como la falta de campos necesarios
        res.status(400).json({ mensaje: 'Error al crear reporte', error });
    }
});

// Ruta para obtener los reportes (GET)
router.get('/',verifyToken, async (req, res) => {
    try {
      // Buscar reportes e incluir la información del usuario relacionado
      const reportes = await Reporte.findAll({
        include: {
          model: Usuario,   // Aquí especificamos el modelo 'Usuario'
          as: 'usuario',    // Asegúrate de usar el alias correcto
        },
      });
  
      res.json(reportes);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener reportes', error });
    }
  });
  

module.exports = router;
