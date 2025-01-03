'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Postulaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      trabajoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Trabajos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pendiente',
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
    await queryInterface.dropTable('Postulaciones');
  },
};
