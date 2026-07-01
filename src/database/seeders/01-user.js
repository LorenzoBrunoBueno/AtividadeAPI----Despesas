'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('user', [
            {
                id: '00000000-0000-0000-0000-000000000001',
                name: 'Lorenzo',
                email: 'lorenzo@email.com',
                password_hash: '$2b$10$hashdummy1',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '00000000-0000-0000-0000-000000000002',
                name: 'Jackson',
                email: 'jackson@email.com',
                password_hash: '$2b$10$hashdummy2',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user', null, {});
    },
};