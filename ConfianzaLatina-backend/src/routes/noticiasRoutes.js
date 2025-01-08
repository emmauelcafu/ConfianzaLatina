const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const { obtenerNoticias,crearNoticia } = require('../handler/HandlerNoticias');
// const { crearNoticia, obtenerNoticias } = require('../controllers/noticiaController');

// Ruta para crear noticias
router.post('/crear', upload.single('imagen'), crearNoticia);
// Ruta para obtener noticias
router.get('/', obtenerNoticias);
module.exports = router;
