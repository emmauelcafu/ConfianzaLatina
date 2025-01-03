'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Reportes', 'Reportes_usuarioId_fkey');
    await queryInterface.removeConstraint('PerfilUsuarios', 'PerfilUsuarios_usuarioId_fkey');
    await queryInterface.removeConstraint('Trabajos', 'Trabajos_usuarioId_fkey');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Reportes', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'Reportes_usuarioId_fkey',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('PerfilUsuarios', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'PerfilUsuarios_usuarioId_fkey',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Trabajos', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'Trabajos_usuarioId_fkey',
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
};
