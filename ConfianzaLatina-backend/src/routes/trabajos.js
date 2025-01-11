const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');
const {
    HandlerTrabajo,
    HandlerConsultaTrabajo,
} = require('../handler/HandlerTrabajos');


router.post('/', verifyToken, HandlerTrabajo);
router.get('/', HandlerConsultaTrabajo);
// router.get('/usuario', verifyToken, HandlerTrabajosPorUsuario);

module.exports = router