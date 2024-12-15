const express = require('express');
const router = express.Router();
const adminController = require('../controllers/ControllersAdmin');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Rutas protegidas para administradores
router.get('/usuarios', verifyToken, isAdmin, adminController.getAllUsuarios);
router.delete('/usuario/:id', verifyToken, isAdmin, adminController.deleteUsuario);
router.get('/empresas', verifyToken, isAdmin, adminController.getAllEmpresas);

module.exports = router;
