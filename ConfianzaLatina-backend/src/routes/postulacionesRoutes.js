const express = require('express');
const router = express.Router();
const { HandlerPostularTrabajo, HandlerPostulacionesTrabajo } = require('../handler/HandlerPostulacioens');
const { verifyToken } = require('../middlewares/auth');  // Middleware de autenticación

// Ruta para postularse a un trabajo
router.post('/', verifyToken, HandlerPostularTrabajo);

// Ruta para listar postulantes de un trabajo
router.get('/:trabajoId/postulantes', verifyToken, HandlerPostulacionesTrabajo);

module.exports = router;
