// Nueva migración para renombrar la columna 'correo' a 'email'
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn('Usuarios', 'correo', 'email');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn('Usuarios', 'email', 'correo');
    }
};
