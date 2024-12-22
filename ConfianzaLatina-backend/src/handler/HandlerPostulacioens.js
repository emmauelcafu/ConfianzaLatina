const Postulacion = require('../models/postulaciones');
const Trabajo = require('../models/trabajos');
const Usuario = require('../models/trabajos');

// Manejar la postulación a un trabajo
const HandlerPostularTrabajo = async (req, res) => {
    const { trabajoId } = req.body; // ID del trabajo al que se postula
    const usuarioId = req.user.id; // Usuario autenticado

    try {
        // Verificar si el trabajo existe
        const trabajo = await Trabajo.findByPk(trabajoId);
        if (!trabajo) {
            return res.status(404).json({ mensaje: 'El trabajo no existe' });
        }

        // Verificar si el usuario ya se postuló a este trabajo
        const existePostulacion = await Postulacion.findOne({ where: { trabajoId, usuarioId } });
        if (existePostulacion) {
            return res.status(400).json({ mensaje: 'Ya te has postulado a este trabajo' });
        }

        // Crear la postulación
        const nuevaPostulacion = await Postulacion.create({ trabajoId, usuarioId });
        res.status(201).json({ mensaje: 'Postulación exitosa', postulacion: nuevaPostulacion });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al postularse', error });
    }
};

// Manejar la lista de postulantes de un trabajo
const HandlerPostulacionesTrabajo = async (req, res) => {
    const { trabajoId } = req.params; // ID del trabajo
    const usuarioId = req.user.id; // Usuario autenticado

    try {
        // Verificar si el usuario autenticado es el propietario del trabajo
        const trabajo = await Trabajo.findOne({ where: { id: trabajoId, usuarioId } });
        if (!trabajo) {
            return res.status(403).json({ mensaje: 'No tienes permiso para ver las postulaciones de este trabajo' });
        }

        // Obtener las postulaciones con datos de los usuarios postulados
        const postulaciones = await Postulacion.findAll({
            where: { trabajoId },
            include: [{ model: Usuario, attributes: ['id', 'nombre', 'correo'] }], // Incluir datos del usuario postulante
        });

        res.json({ trabajoId, postulaciones });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar postulaciones', error });
    }
};

module.exports = {
    HandlerPostularTrabajo,
    HandlerPostulacionesTrabajo,
};

