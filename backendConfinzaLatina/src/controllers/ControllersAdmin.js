const Usuario = require('../models/Usuario');
const PerfilUsuario = require('../models/PerfilUsuario');
const Empresa = require('../models/Empresa');

const adminController = {
  // Obtener todos los usuarios
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  // Eliminar un usuario por ID
  deleteUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      await Usuario.destroy({ where: { id } });
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  },

  // Obtener empresas registradas
  getAllEmpresas: async (req, res) => {
    try {
      const empresas = await Empresa.findAll({ include: Usuario });
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener empresas' });
    }
  },
};

module.exports = adminController;
