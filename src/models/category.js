const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');


const Category = sequelize.define('category', {
    id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'category',
    timestamps: false,
})

module.exports = Category


