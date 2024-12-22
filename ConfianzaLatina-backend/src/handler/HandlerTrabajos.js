const {
    ControllersTrabajos,
    ControllersConsultaTrabajo,
    ControllersTrabajosPorUsuario,
    ControllersPostularTrabajo,
    ControllersPostulacionesTrabajo,
} = require('../controllers/ControllersTrabajos');

// Crear un trabajo
const HandlerTrabajo = async (req, res) => {
    const { titulo, descripcion, empresa, ubicacion, salario } = req.body;
    const usuarioId = req.user.id;

    try {
        const trabajo = await ControllersTrabajos({ titulo, descripcion, empresa, ubicacion, salario, usuarioId });
        res.status(201).json(trabajo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear trabajo', error });
    }
};

// Listar trabajos
const HandlerConsultaTrabajo = async (req, res) => {
    try {
        const trabajos = await ControllersConsultaTrabajo();
        res.json(trabajos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar trabajos', error });
    }
};

// Listar trabajos por usuario
const HandlerTrabajosPorUsuario = async (req, res) => {
    const usuarioId = req.user.id;

    try {
        const trabajos = await ControllersTrabajosPorUsuario(usuarioId);
        res.json(trabajos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar trabajos por usuario', error });
    }
};

// Postularse a un trabajo


// Listar postulaciones a un trabajo


module.exports = {
    HandlerTrabajo,
    HandlerConsultaTrabajo,
    HandlerTrabajosPorUsuario,
}