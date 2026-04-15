const expense = require('../controllers/expense');

class ExpenseView {
    async getAll(req, res) {
        const getAll = await expense.getAll();
        if (getAll === null) {
            return res.status(200).json("Sem despesas para retornar! Cadastre alguma despesa utilizando o POST!")
        }
        return res.status(200).json(getAll);
    }
    async create(req, res) {
        return expense.create(req, res);
    }
    async getById(req, res) {
        return expense.GetById(req, res);
    }
    async update(req, res) {
        return expense.update(req, res);
    }
    async delete(req, res) {
        return expense.delete(req, res);
    }
    async somaTotalDespesas(req, res) {
        return expense.somaTotalDespesas(req, res);
    }
    async somaTotalDespesasCategoria(req, res) {
        return expense.somaTotalDespesasCategoria(req, res);
    }
}

module.exports = new ExpenseView();

