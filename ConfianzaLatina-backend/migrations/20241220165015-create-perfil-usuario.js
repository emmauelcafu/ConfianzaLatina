'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PerfilUsuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nacionalidad: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pasaporte: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numeroTelefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      disponibilidad: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      edad: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sexo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idioma: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios', // Nombre de la tabla asociada
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PerfilUsuarios');
  },
};
