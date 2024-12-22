module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trabajos', 'estado', {
      type: Sequelize.STRING,
      defaultValue: 'activo',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trabajos', 'estado');
  }
};
