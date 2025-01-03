'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trabajos', 'nuevaColumna', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    // Agrega aquí cualquier otra columna o cambios que hayas añadido
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trabajos', 'nuevaColumna');
    // Remueve aquí cualquier otra columna o cambios que hayas añadido
  },
};
