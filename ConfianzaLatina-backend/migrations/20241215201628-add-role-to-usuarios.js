'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'role', {
      type: Sequelize.ENUM('empleado', 'empresa', 'admin'),
      allowNull: false,
      defaultValue: 'empleado',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'role');
  }
};

