'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('expense', {
            id: {
                type: Sequelize.CHAR(36),
                primaryKey: true,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            value: {
                type: Sequelize.DECIMAL(20, 2).UNSIGNED,
                allowNull: false,
            },
            date_expense: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('pendente', 'paga'),
                allowNull: false,
                defaultValue: 'pendente',
            },
            categoria_Id: {
                type: Sequelize.CHAR(36),
                allowNull: false,
                references: { model: 'category', key: 'id' },
            },
            user_id: {
                type: Sequelize.CHAR(36),
                allowNull: false,
                references: { model: 'user', key: 'id' },
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('expense');
    },
};