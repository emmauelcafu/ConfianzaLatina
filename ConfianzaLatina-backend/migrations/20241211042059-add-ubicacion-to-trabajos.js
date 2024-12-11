'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trabajos', 'ubicacion', {
      type: Sequelize.STRING,
      allowNull: true,  // Ajusta según lo que necesites
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trabajos', 'ubicacion');
  }
};
