'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Postulaciones', 'nuevaColumna', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    // Agrega aquí cualquier otra columna que hayas añadido
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Postulaciones', 'nuevaColumna');
    // Remueve aquí cualquier otra columna que hayas añadido
  },
};
