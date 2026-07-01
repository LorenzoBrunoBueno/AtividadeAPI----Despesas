'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('category', [
            {
                id: 'b1b2c3d4-0000-0000-0000-000000000001',
                name: 'Alimentação',
                description: 'comida e bebida',
            },
            {
                id: 'b1b2c3d4-0000-0000-0000-000000000002',
                name: 'Transporte',
                description: 'locomoção',
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('category', null, {});
    },
};