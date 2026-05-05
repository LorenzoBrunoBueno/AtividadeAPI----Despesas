const expense = require('../controllers/expense');

class ExpenseView {
    async getAll(req, res) {
        return await expense.getAll(req, res);
    }
    async create(req, res) {
        return await expense.create(req, res);
    }
    async getById(req, res) {
        return await expense.GetById(req, res);
    }
    async update(req, res) {
        return await expense.update(req, res);
    }
    async delete(req, res) {
        return await  expense.delete(req, res);
    }
    async somaTotalDespesas(req, res) {
        return await expense.somaTotalDespesas(req, res);
    }
    async somaTotalDespesasCategoria(req, res) {
        return await expense.somaTotalDespesasCategoria(req, res);
    }
}

module.exports = new ExpenseView();

