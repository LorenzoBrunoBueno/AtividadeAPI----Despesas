const ExpenseModel = require('../models/expense');
const CategoryModel = require('../models/category');
const crypto = require('node:crypto');
const bycrpt = require('bcrypt');
const { Op } = require('sequelize');

class ExpenseService {

    constructor() { }

    async createExpense(description, value, date_expense, status, categoriaId, usuarioId) {

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
        return await ExpenseModel.create(id, description, value, date_expense, status, categoriaId, usuarioId);
    }

    async getExpenseById(id) {

        if (!id) {
            throw new Error("Sem Parâmetro ID!");
        }
        if (isNaN(Number(id))) {
            throw new Error("O Parâmetro ID precisa ser um número!");
        }

        const response = await ExpenseModel.findByPk(id, { include: [{ association: 'category' }, { association: 'user' }] });

        if(!response){
            throw new Error('Despesa Não encontrada!');
        }

        return response 
    }


    async getAll({categoria, status, dataIni, dataFim, valorMin, valorMax}) {
        
        const where = {}

        if(categoria) {

            const responseCategoria = await CategoryModel.findAll({ where: { name: categoria }})

            if(responseCategoria){
                const categoriaId = responseCategoria.id;
                where.categoria = categoriaId;    
            }

        }

        if(status) where.status = status;

        if(valorMin || valorMax) {
            where.valor = {};
            if (valorMin) where.valor[Op.gte] = Number(valorMin);
            if (valorMax) where.valor[Op.lte] = Number(valorMax);
        }

        if(dataIni || dataFim) {
            where.periodo = {};
            if (dataIni) where.periodo[Op.gte] = new Date(dataIni);
            if (dataFim) where.periodo[Op.lte] = new Date(dataFim);
        }

        const response = await ExpenseModel.findAll({ where });

        if(!response){
            throw new Error('Sem despesas cadastradas!');
        }

        return response;
    }


    async updateExpense(id, description, value, date_expense, status, categoriaId, usuarioId) {

        if (!id) {
            throw new Error("Sem Parâmetro ID!");
        }

        if (isNaN(Number(id))) {
            throw new Error("O Parâmetro ID precisa ser um número!");
        }

        if (value <= 0) {
            throw new Error("O Campo 'Amount' deve ser maior que zero!");
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
        expense.usuarioId = usuarioId

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