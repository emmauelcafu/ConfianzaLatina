const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


    const ControllerRegister = async ({nombre,email,password})=>{
        try {
            //has del password
            const hashedPassword = await bcrypt.hash(password, 10);
            const nuevoUsuario = await Usuario.create({ nombre, email, password: hashedPassword });
            return nuevoUsuario
        } catch (error) {
            console.error('Error en registerController:', error)
            throw new Error('No se pudo registrar al usuario.');
        }
    }


const Controllerlogin = async ({email,password}) => {
        
       // Buscar usuario en la base de datos
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('Usuario no encontrado');

  // Comparar contraseña
  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) throw new Error('Contraseña incorrecta');

  // Generar token
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
    }


module.exports ={
    ControllerRegister,
    Controllerlogin
}