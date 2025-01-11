// routes/empresa.js
const express = require('express');
const Empresa = require('../models/Empresa');
const {verifyToken} = require('../middlewares/auth');  // Si deseas proteger esta ruta

const router = express.Router();

// Crear una nueva empresa
router.post('/', verifyToken, async (req, res) => {
  const { nombre, direccion, telefono, correo, descripcion, sector } = req.body;
  
  try {
    const nuevaEmpresa = new Empresa({
      nombre,
      direccion,
      telefono,
      correo,
      descripcion,
      sector,
    });

    // Guardar la empresa en la base de datos
    await nuevaEmpresa.save();
    res.status(201).json({ mensaje: 'Empresa creada exitosamente', empresa: nuevaEmpresa });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la empresa', error: error.message });
  }
});
// routes/empresa.js
router.get('/', async (req, res) => {
    try {
      // Obtener todas las empresas desde la base de datos
      const empresas = await Empresa.find();
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener las empresas', error: error.message });
    }
  });
  

module.exports = router;
