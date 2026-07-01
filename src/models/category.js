const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');

const Category = (sequelize) => {
    return sequelize.define('category', {
        id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.varchar(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'category',
        underscored: true
    })
}

module.exports = Category


