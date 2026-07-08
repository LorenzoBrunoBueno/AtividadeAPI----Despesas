const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');


const Expense = sequelize.define('expense', {
    id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    value: {
        type: DataTypes.DECIMAL(20, 2).UNSIGNED,
        allowNull: false
    },
    date_expense: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isPast(date){
                const dateHoje = Date.now();
                const dateParse = Date.parse(date);
                if(dateParse > dateHoje){
                    throw new Error('Registre apenas contas passadas ou de hoje!')
                }
            }
        }
    },
    status: {
        type: DataTypes.ENUM('pendente', 'pago'),
        default: 'pendente',
        allowNull: false
    },
    categoriaId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    userId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'expense',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Expense;
