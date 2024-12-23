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
const HandlerPostulacionesTrabajo = async (req, res) => {
    const { trabajoId } = req.params; // ID del trabajo
    const usuarioId = req.user.id; // Usuario autenticado

    try {
        // Verificar si el usuario autenticado es el propietario del trabajo
        const trabajo = await Trabajo.findOne({ where: { id: trabajoId, usuarioId } });
        if (!trabajo) {
            return res.status(403).json({ mensaje: 'No tienes permiso para ver las postulaciones de este trabajo' });
        }

        // Obtener las postulaciones con datos de los usuarios postulados (solo id y nombre)
        const postulaciones = await Postulacion.findAll({
            where: { trabajoId },
            include: [
                {
                    model: Usuario,
                    as: 'usuario', // Usar el alias correcto para Usuario
                    attributes: ['id', 'nombre'] // Incluir solo id y nombre del usuario
                },
                {
                    model: Trabajo,
                    as: 'trabajo', // Alias de la relación con Trabajo (si lo tienes definido)
                    attributes: ['id', 'nombre'] // Incluir solo los datos necesarios de Trabajo
                }
            ]
        });

        // Responder con la lista de postulaciones
        res.json({
            trabajoId,
            postulaciones: postulaciones.map(postulacion => {
                const usuario = postulacion.usuario; // Aquí usamos el alias 'usuario'
                const trabajo = postulacion.trabajo; // Aquí usamos el alias 'trabajo'

                return {
                    id: postulacion.id,
                    usuarioId: postulacion.usuarioId,
                    estado: postulacion.estado,
                    createdAt: postulacion.createdAt,
                    updatedAt: postulacion.updatedAt,
                    usuario: {
                        id: usuario.id,
                        nombre: usuario.nombre
                    },
                    trabajo: {
                        id: trabajo.id,
                        nombre: trabajo.nombre
                    } // Asegúrate de incluir solo los datos que necesitas
                };
            })
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al listar postulaciones', error });
    }
};




module.exports = {
    HandlerPostularTrabajo,
    HandlerPostulacionesTrabajo,
};

