// routes/auth.js
const express = require('express');
const {HandlerRegister,HandlerLogin}= require('../handler/HandlerAuth')
const router = express.Router();

    router.post('/registro',HandlerRegister);

router.post('/login', HandlerLogin);

module.exports = router;
