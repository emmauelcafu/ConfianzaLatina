const { ControllerPerfilUsuario, ControllerConsultarPerfilUsuario } = require("../controllers/ControllersPerfilUsuario");
const PerfilUsuario = require('../models/PerfilUsuario');

// Handler para crear o actualizar perfil
const HandlerPerfilUsuario = async (req, res) => {
    const { nacionalidad, pasaporte, numeroTelefono, disponibilidad, edad, sexo, idioma } = req.body;
    const usuarioId = req.user.id; // El ID de usuario viene del token de autenticación

    try {
        // Verificar si ya existe un perfil para el usuario
        let perfilUsuario = await PerfilUsuario.findOne({ where: { usuarioId } });

        if (perfilUsuario) {
            // Si existe, actualizamos el perfil
            perfilUsuario.nacionalidad = nacionalidad || perfilUsuario.nacionalidad;
            perfilUsuario.pasaporte = pasaporte || perfilUsuario.pasaporte;
            perfilUsuario.numeroTelefono = numeroTelefono || perfilUsuario.numeroTelefono;
            perfilUsuario.disponibilidad = disponibilidad || perfilUsuario.disponibilidad;
            perfilUsuario.edad = edad || perfilUsuario.edad;
            perfilUsuario.sexo = sexo || perfilUsuario.sexo;
            perfilUsuario.idioma = idioma || perfilUsuario.idioma;

            await perfilUsuario.save();  // Guardar los cambios
            res.status(200).json({ mensaje: 'Perfil actualizado', perfilUsuario });
        } else {
            // Si no existe, se crea un nuevo perfil
            perfilUsuario = await PerfilUsuario.create({
                usuarioId,
                nacionalidad,
                pasaporte,
                numeroTelefono,
                disponibilidad,
                edad,
                sexo,
                idioma
            });

            res.status(201).json({ mensaje: 'Perfil creado', perfilUsuario });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: 'Error al registrar/actualizar perfil', error: error.message });
    }
};

// Handler para consultar perfil
const HandlerConsultarPerfilUsuario = async (req, res) => {
    const usuarioId = req.user.id;  // Obtener el ID del usuario desde el token de autenticación
    
    try {
        const perfilUsuario = await PerfilUsuario.findOne({ where: { usuarioId } });

        if (!perfilUsuario) {
            return res.status(404).json({ mensaje: 'Perfil no encontrado' });
        }

        res.status(200).json(perfilUsuario);
    } catch (error) {
        console.error('Error al listar perfil de usuario:', error);
        res.status(500).json({ mensaje: 'Error al listar perfil de usuario', error: error.message });
    }
};

module.exports = {
    HandlerPerfilUsuario,
    HandlerConsultarPerfilUsuario
};
