const Expense = require('../models/expense');

class ExpenseController {
    getAll() {
        return Expense.getAll();
    }
    async GetById(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json("Sem Parâmetro ID!");
        }
        if (isNaN(Number(id))) {
            return res.status(400).json("O Parâmetro ID precisa ser um número!");
        }
        const expenseResponse = await Expense.getById(id);
        if (expenseResponse === null) {
            return res.status(404).json("Despesa não encontrada!");
        }
        return res.status(200).json(expenseResponse);
    }
    async create(req, res) {
        const { title, amount, category, date, description } = req.body;
        if (!title) {
            console.log("O Campo 'title' é obrigatório!");
            return res.status(400).json("O Campo 'title' é obrigatório!");
        }

        if (amount <= 0) {
            return res.status(400).json("O Campo 'Amount' deve ser maior que zero!");
        }

        let dataHoje = Date.now();
        let dataParse = Date.parse(date);
        if (dataParse > dataHoje) {
            return res.status(400).json("Registre apenas contas passadas ou de hoje!");
        }

        const expenseResponse = await Expense.create(title, amount, category, date, description);
        if (expenseResponse === null) {
            return res.status(400).json("Erro ao criar despesa!");
        }
        return res.status(200).json(expenseResponse);
    }
    async update(req, res) {
        const id = req.params.id;
        const { title, amount, category, date, description } = req.body;
        if (amount <= 0) {
            return res.status(400).json("O Campo 'Amount' deve ser maior que zero!");
        }

        let dataHoje = Date.now();
        let dataParse = Date.parse(date);
        if (dataParse > dataHoje) {
            return res.status(400).json("Registre apenas contas passadas ou de hoje!");
        }
        const expenseResponse = await Expense.update(Number(id), title, amount, category, date, description);
        if (expenseResponse === null) {
            return res.status(400).json("Erro ao atualizar despesa!");
        }
        return res.status(200).json(expenseResponse);

    }
    async delete(req, res) {
        const id = req.params.id;
        const selecExpense = await Expense.delete(id);
        if (selecExpense === null) {
            return res.status(404).json("Despesa não encontrada!");
        }
        return res.status(200).json("Despesa Excluída", selecExpense);
    }
    async somaTotalDespesas() {
        const somaTotal = await Expense.somaTotalDespesas();
        if (somaTotal === null) {
            return res.status(400).json("Erro ao calcular soma total de despesas!");
        }
        return res.status(200).json(somaTotal);
    }
    async somaTotalDespesasCategoria() {
        const somaTotalCategoria = await Expense.somaTotalDespesasCategoria();
        if (somaTotal === null) {
            return res.status(400).json("Erro ao calcular soma total de despesas!");
        }
        return res.status(200).json(somaTotalCategoria);
    }
}

module.exports = new ExpenseController();