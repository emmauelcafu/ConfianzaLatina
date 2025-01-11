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

async function ControllerConsultarPerfilUsuario(usuarioId) {
  try {
    const perfilUsuario = await PerfilUsuario.findOne({ where: { usuarioId } });
    if (!perfilUsuario) {
      throw new Error('Perfil no encontrado');
    }
    return perfilUsuario;
  } catch (error) {
    throw new Error('Error al consultar perfil: ' + error.message);
  }
}

module.exports = { ControllerPerfilUsuario ,ControllerConsultarPerfilUsuario};
