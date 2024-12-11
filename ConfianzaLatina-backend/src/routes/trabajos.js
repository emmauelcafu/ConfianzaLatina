// src/routes/trabajos.js
const express = require('express');
const router = express.Router();
const Trabajo = require('../models/trabajos');  // Asegúrate de que la ruta es correcta
const verifyToken = require('../middlewares/auth');

// Crear trabajo
router.post('/', verifyToken, async (req, res) => {
    const { titulo, descripcion, empresa, ubicacion, salario } = req.body;
    try {
        const nuevoTrabajo = await Trabajo.create({
            titulo,
            descripcion,
            empresa,
            ubicacion,
            salario,
        });

        res.status(201).json(nuevoTrabajo);
    } catch (error) {
        console.error('Error al crear trabajo:', error);
        res.status(500).json({ mensaje: 'Error al crear trabajo', error });
    }
});

// Listar trabajos
router.get('/', async (req, res) => {
    try {
        const trabajos = await Trabajo.findAll();
        res.json(trabajos);
    } catch (error) {
        console.error('Error al listar trabajos:', error);
        res.status(500).json({ mensaje: 'Error al listar trabajos', error });
    }
});

module.exports = router;
