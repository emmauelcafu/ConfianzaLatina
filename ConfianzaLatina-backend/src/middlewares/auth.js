require('dotenv').config();
const jwt = require('jsonwebtoken');
// valida las autenticaciones.
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Token no encontrado');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send('Token inválido');
    }
};

// validas si es admin

function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado, no eres administrador' });
    }
    next();
  }

module.exports = {verifyToken,isAdmin};
