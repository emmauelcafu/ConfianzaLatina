const PerfilUsuario = require('../models/PerfilUsuario');

async function ControllerPerfilUsuario(data) {
  const { nacionalidad, pasaporte, numeroTelefono, disponibilidad, edad, sexo, idioma, usuarioId } = data;

  try {
    // Crear el perfil de usuario en la base de datos
    const perfilUsuario = await PerfilUsuario.create({
      nacionalidad,
      pasaporte,
      numeroTelefono,
      disponibilidad,
      edad,
      sexo,
      idioma,
      usuarioId
    });

    // Retorna el perfil creado
    return perfilUsuario;
  } catch (error) {
    throw new Error('Error al crear el perfil de usuario: ' + error.message);
  }
}
// consultar ususario

async function ControllerConsultarPerfilUsuario() {
  try {
    const consultaUsuario = await PerfilUsuario.findAll();
    return consultaUsuario;
  } catch (error) {
    console.error('Error al listar ControllerConsultarPerfilUsuario:', error);
    res.status(500).json({mensaje:'Error al listar ControllerConsultarPerfilUsuario', error})
  }
}

module.exports = { ControllerPerfilUsuario ,ControllerConsultarPerfilUsuario};
