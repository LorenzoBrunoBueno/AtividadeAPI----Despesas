'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('expense', [
            {
                id: 'c1b2c3d4-0000-0000-0000-000000000001',
                description: 'Almoço',
                value: 45.90,
                date_expense: '2025-06-01',
                status: 'paga',
                categoria_Id: 'b1b2c3d4-0000-0000-0000-000000000001',
                user_id: '00000000-0000-0000-0000-000000000001',
            },
            {
                id: 'c1b2c3d4-0000-0000-0000-000000000002',
                description: 'Uber',
                value: 18.50,
                date_expense: '2025-06-02',
                status: 'pendente',
                categoria_Id: 'b1b2c3d4-0000-0000-0000-000000000002',
                user_id: '00000000-0000-0000-0000-000000000002',
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('expense', null, {});
    },
};