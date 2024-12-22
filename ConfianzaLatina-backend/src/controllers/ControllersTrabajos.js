const Trabajo = require('../models/trabajos');
const Postulacion = require('../models/postulaciones');

// Crear un trabajo
const ControllersTrabajos = async ({ titulo, descripcion, empresa, ubicacion, salario, usuarioId }) => {
    try {
        const nuevoTrabajo = await Trabajo.create({ titulo, descripcion, empresa, ubicacion, salario, usuarioId });
        return nuevoTrabajo;
    } catch (error) {
        console.error('Error al crear trabajo:', error);
        throw error;
    }
};

// Listar todos los trabajos
const ControllersConsultaTrabajo = async () => {
    try {
        const trabajos = await Trabajo.findAll();
        return trabajos;
    } catch (error) {
        console.error('Error al listar trabajos:', error);
        throw error;
    }
};

// Listar trabajos por usuario
const ControllersTrabajosPorUsuario = async (usuarioId) => {
    try {
        const trabajos = await Trabajo.findAll({ where: { usuarioId } });
        return trabajos;
    } catch (error) {
        console.error('Error al listar trabajos por usuario:', error);
        throw error;
    }
};

// Postularse a un trabajo
const ControllersPostularTrabajo = async ({ trabajoId, usuarioId }) => {
    try {
        const nuevaPostulacion = await Postulacion.create({ trabajoId, usuarioId });
        return nuevaPostulacion;
    } catch (error) {
        console.error('Error al postularse a trabajo:', error);
        throw error;
    }
};

// Listar postulaciones a un trabajo
const ControllersPostulacionesTrabajo = async (trabajoId) => {
    try {
        const postulaciones = await Postulacion.findAll({ where: { trabajoId } });
        return postulaciones;
    } catch (error) {
        console.error('Error al listar postulaciones:', error);
        throw error;
    }
};

module.exports = {
    ControllersTrabajos,
    ControllersConsultaTrabajo,
    ControllersTrabajosPorUsuario,
    ControllersPostularTrabajo,
    ControllersPostulacionesTrabajo,
};
