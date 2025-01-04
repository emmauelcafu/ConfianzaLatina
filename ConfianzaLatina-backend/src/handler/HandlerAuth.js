const Usuario = require('../models/Usuario');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const express = require('express');
const { ControllerRegister,Controllerlogin } = require('../controllers/ControllersAuth');



const HandlerRegister = async (req, res) => {
  const { nombre, email, password, role } = req.body; // Extraer role
  try {
      const nuevoUsuario = await ControllerRegister({ nombre, email, password, role });
      res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });
  } catch (error) {
      res.status(400).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};


const HandlerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, role, nombre } = await Controllerlogin({ email, password }); // Destructura los datos
    res.json({ mensaje: 'Inicio de sesión exitoso', token, role, nombre }); // Incluye el rol y nombre en la respuesta
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      res.status(404).json({ mensaje: error.message });
    } else if (error.message === 'Contraseña incorrecta') {
      res.status(401).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
  }
};

module.exports={
    HandlerRegister,
    HandlerLogin
}