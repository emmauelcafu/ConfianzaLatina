const express = require('express');
const {verifyToken} = require('../middlewares/auth')
const {HandlerPerfilUsuario,HandlerConsultarPerfilUsuario}= require('../handler/HandlerPerfilUsuario');

const router = express.Router();

router.post('/', verifyToken,HandlerPerfilUsuario);
router.get('/',verifyToken, HandlerConsultarPerfilUsuario);

module.exports= router;