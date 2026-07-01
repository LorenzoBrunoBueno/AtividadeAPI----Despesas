const ExpenseModel = require('../models/expense');
const CategoryModel = require('../models/category');
const crypto = require('node:crypto');
const bycrpt = require('bcrypt');
const { Op } = require('sequelize');

class ExpenseService {

    constructor() { }

    async createExpense(description, value, date_expense, status, categoriaId, userId) {

        if (!description) {
            console.log("O Campo 'title' é obrigatório!");
            throw new Error("O Campo 'title' é obrigatório!");
        }

        if (value <= 0) {
            throw new Error("O Campo 'Amount' deve ser maior que zero!");
        }

        let dataHoje = Date.now();
        let dataParse = Date.parse(date_expense);
        if (dataParse > dataHoje) {
            throw new Error("Registre apenas contas passadas ou de hoje!");
        }

        const id = crypto.randomUUID();
        return await ExpenseModel.create({id, description, value, date_expense, status, categoriaId, userId});
    }

    async getExpenseById(id) {

        if (!id) {
            throw new Error("Sem Parâmetro ID!");
        }

        const response = await ExpenseModel.findByPk(id, { include: [{ association: 'category' }, { association: 'user' }] });

        if(!response){
            throw new Error('Despesa Não encontrada!');
        }

        return response 
    }


    async getAll(categoria, status, dataIni, dataFim, valorMin, valorMax) {
        
        const where = {}

        if(categoria) {
            console.log(categoria);
            const responseCategoria = await CategoryModel.findOne({ where: { name: categoria }})

            if(responseCategoria){
                const categoriaId = responseCategoria.id;
                where.categoriaId = categoriaId;    
            }

        }

        if(status){
            console.log(status);
            where.status = status;  
        } 

        if(valorMin || valorMax) {
            where.value = {};
            if (valorMin) {
                console.log(valorMin)
                where.value[Op.gte] = Number(valorMin);
            }
            if (valorMax) {
                console.log(valorMax)
                where.value[Op.lte] = Number(valorMax);  
            } 
        }

        if(dataIni || dataFim) {
            where.date_expense = {};
            if (dataIni) {
                console.log(dataIni)
                const ini = new Date(`${dataIni}T00:00:00`);
                where.date_expense[Op.gte] = ini;
            }
            if (dataFim) {
                console.log(dataFim)
                where.date_expense[Op.lte] = new Date(dataFim);
            }
        }
        console.log(JSON.stringify(where, null, 2));
        const response = await ExpenseModel.findAll({ where });

        if(!response){
            throw new Error('Sem despesas cadastradas!');
        }

        return response;
    }


    async updateExpense(id, description, value, date_expense, status, categoriaId, userId) {

        if (!id) {
            throw new Error("Sem Parâmetro ID!");
        }

        if (value <= 0) {
            throw new Error("O Campo 'value' deve ser maior que zero!");
        }

        let dataHoje = Date.now();
        let dataParse = Date.parse(date_expense);
        if (dataParse > dataHoje) {
            throw new Error("Registre apenas contas passadas ou de hoje!");
        }

        const expense = await this.getExpenseById(id);

        if (!expense) {
            throw new Error('Despesa não encontrada!');
        }

        expense.description = description
        expense.value = value
        expense.date_expense = date_expense
        expense.status = status
        expense.categoriaId = categoriaId
        expense.usuarioId = userId

        await expense.save();
        return expense;
    }

    async deleteExpense(id) {
        
        const expense = await this.getExpenseById(id);

        if (!expense) {
            throw new Error('Despesa não encontrada!');
        }

        await expense.destroy();
        return null;
    }
}

module.exports = new ExpenseService();