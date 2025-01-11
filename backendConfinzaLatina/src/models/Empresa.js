const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa tu instancia de Sequelize

// Definir el modelo para la empresa
const Empresa = sequelize.define('Empresa', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,  // El nombre de la empresa es obligatorio
    unique: true,      // Asegura que no haya empresas con el mismo nombre
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,  // La dirección de la empresa es obligatoria
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,  // El número de teléfono es obligatorio
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,  // El correo de la empresa es obligatorio
    unique: true,      // Asegura que no haya empresas con el mismo correo
    validate: {
      isEmail: true,   // Validación de formato de correo electrónico
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,   // Campo opcional
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: true,   // Campo opcional
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // Si no se proporciona, se establece la fecha actual
  },
});

// Exportar el modelo
module.exports = Empresa;
