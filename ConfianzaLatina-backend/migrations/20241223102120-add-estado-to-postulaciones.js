'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Postulaciones', 'estado', {
      type: Sequelize.STRING,
      defaultValue: 'pendiente',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Postulaciones', 'estado');
  }
};
