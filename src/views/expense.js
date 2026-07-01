const ExpenseController = require('../controllers/expense');

class ExpenseView {
    async getAll(req, res, next) {
        return await ExpenseController.getAll(req, res, next);
    }
    async create(req, res, next) {
        return await ExpenseController.create(req, res, next);
    }
    async getById(req, res, next) {
        return await ExpenseController.GetById(req, res, next);
    }
    async update(req, res, next) {
        return await ExpenseController.update(req, res, next);
    }
    async delete(req, res, next) {
        return await  ExpenseController.delete(req, res, next);
    }
    async somaTotalDespesas(req, res, next) {
        return await ExpenseController.somaTotalDespesas(req, res, next);
    }
    async somaTotalDespesasCategoria(req, res, next) {
        return await ExpenseController.somaTotalDespesasCategoria(req, res, next);
    }
}

module.exports = new ExpenseView();

