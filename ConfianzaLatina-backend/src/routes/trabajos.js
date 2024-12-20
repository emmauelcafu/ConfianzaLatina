// src/routes/trabajos.js
const express = require('express');
const router = express.Router();

const {HandlerTrabajo,HandlerConsultaTrabajo}= require('../handler/HandlerTrabajos')
// Crear trabajo
router.post('/', HandlerTrabajo,);

// Listar trabajos
router.get('/',HandlerConsultaTrabajo );

module.exports = router;
