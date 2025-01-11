const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Controllerlogin = async ({ email, password }) => {
  // Buscar usuario en la base de datos
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('Usuario no encontrado');

  // Comparar contraseña
  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) throw new Error('Contraseña incorrecta');

  // Generar token
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, role: usuario.role }, // Incluye el rol y el id en el token
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, role: usuario.role, nombre: usuario.nombre, id: usuario.id }; // Devuelve token, rol, nombre y id
};

const ControllerRegister = async ({ nombre, email, password, role }) => {
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el usuario con el rol proporcionado o usar el valor por defecto
      const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        role: role || 'empleado', // Si no se proporciona rol, usa 'empleado'
      });
  
      return nuevoUsuario;
    } catch (error) {
      console.error('Error en registerController:', error);
      throw new Error('No se pudo registrar al usuario.');
    }
  };    

module.exports = {
  ControllerRegister,
  Controllerlogin,
};
