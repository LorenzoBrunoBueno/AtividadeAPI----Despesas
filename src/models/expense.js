const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');

const Expense = (sequelize) => {
    return sequelize.define('expense', {
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
                    let dataHoje = Date.now();
                    let dataParse = Date.parse(date);
                    if(datePare > dateHoje){
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
            type: DataTypes.char(36),
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        usuarioId: {
            type: DataTypes.char(36),
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
        underscored: true
    })
}
    

module.exports = Expense;
