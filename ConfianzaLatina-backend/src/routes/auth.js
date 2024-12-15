// routes/auth.js
const express = require('express');
const {HandlerRegister,HandlerLogin}= require('../handler/HandlerAuth');
const {HandlerRegistrarAdmin} = require('../handler/HandlerAdmin');
const router = express.Router();

    router.post('/registro',HandlerRegister);
    router.post('/login', HandlerLogin);
    router.post('/register/admin',HandlerRegistrarAdmin);

module.exports = router;
