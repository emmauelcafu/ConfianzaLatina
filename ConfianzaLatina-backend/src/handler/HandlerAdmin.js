const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

async function HandlerRegistrarAdmin (req, res) {
  const { nombre, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    res.json({ message: 'Administrador registrado exitosamente', admin });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar administrador' });
  }
}

module.exports = { HandlerRegistrarAdmin };
