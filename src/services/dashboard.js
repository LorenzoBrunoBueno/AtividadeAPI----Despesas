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
            attributes: ['categoria_Id', [sequelize.fn('SUM', sequelize.col('value')), 'totalCategoria']],
            group: ['categoria_Id'],
            include: [{
                model: CategoryModel,
                as: 'category',
                attributes: ['name']
            }], 
            raw: true
        });

        return totaisCategorias;
    }

    async totalExpenses (){
        return await ExpenseModel.sum('value');
    }

    async lastExpenses (limite){
        return await ExpenseModel.findAll({
            order: [['created_at', 'DESC']],
            limit: parseInt(limite, 10)
        })
    }
}

module.exports = new DashboardService();