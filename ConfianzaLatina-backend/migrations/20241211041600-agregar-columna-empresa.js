'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trabajos', 'empresa', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    // Agrega aquí cualquier otra columna que hayas añadido
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trabajos', 'empresa');
    // Remueve aquí cualquier otra columna que hayas añadido
  },
};
