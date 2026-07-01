const ExpenseModel = require('../models/expense');
const CategoryModel = require('../models/category');
const sequelize = require('sequelize');

class DashboardService {
    constructor () {}

    async countExpenses (){
        return await ExpenseModel.count();
    }

    async byCategoryExpenses (){
        const totaisCategorias = await ExpenseModel.findAll({
            attributes: ['category_id', [sequelize.fn('SUM', sequelize.col('value')), 'totalCategoria']],
            group: ['category_id'],
            include: [{
                model: category,
                attributes: ['name']
            }], 
            raw: true
        });

        return totaisCategorias;
    }

    async totalExpenses (){
        return await ExpenseModel.sum('value');
    }
}

module.exports = new DashboardService();