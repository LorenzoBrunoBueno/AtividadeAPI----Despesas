const ExpenseController = require('../controllers/expense');

class ExpenseView {
    async getAll(req, res) {
        return await ExpenseController.getAll(req, res);
    }
    async create(req, res) {
        return await ExpenseController.create(req, res);
    }
    async getById(req, res) {
        return await ExpenseController.GetById(req, res);
    }
    async update(req, res) {
        return await ExpenseController.update(req, res);
    }
    async delete(req, res) {
        return await  ExpenseController.delete(req, res);
    }
    async somaTotalDespesas(req, res) {
        return await ExpenseController.somaTotalDespesas(req, res);
    }
    async somaTotalDespesasCategoria(req, res) {
        return await ExpenseController.somaTotalDespesasCategoria(req, res);
    }
}

module.exports = new ExpenseView();

