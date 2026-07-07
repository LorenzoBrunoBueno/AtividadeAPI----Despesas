const ExpenseService = require('../services/expense');

const NodeCache = require('node-cache');
const cache = new NodeCache();


class ExpenseController {
    async getAll(req, res, next) {
        try {
            const { categoria, status, dataIni, dataFim, valorMin, valorMax } = req.query;

            const cacheKey = `getAllExpenses:${categoria}:${status}:${dataIni}:${dataFim}:${valorMin}:${valorMax}`;

            const cacheExpenses = cache.get(cacheKey);

            if (cacheExpenses) {
                console.log("retorno do cache!");
                return res.status(200).json({
                    data: cacheExpenses, links: [
                        { rel: "somaTotalDespesas", href: "/api/v2/expenses/summary/total", method: "GET" },
                        { rel: "somaTotalDespesasCategoria", href: "/api/v2/expenses/summary/category", method: "GET" },
                    ]
                });
            }

            const response = await ExpenseService.getAll(categoria, status, dataIni, dataFim, valorMin, valorMax);

            const cached = cache.set(cacheKey, response);

            if (!cached) {
                console.log("Não foi possível cachear a requisição!");
            }

            return res.status(200).json({
                data: response, links: [
                    { rel: "create", href: "/api/v2/expenses", method: "POST" },
                    { rel: "somaTotalDespesas", href: "/api/v2/expenses/summary/total", method: "GET" },
                    { rel: "somaTotalDespesasCategoria", href: "/api/v2/expenses/summary/category", method: "GET" },
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async GetById(req, res, next){
        try {
            const id = req.params.id;

            const response = await ExpenseService.getExpenseById(id);

            return res.status(200).json({
                data: response, links: [
                    { rel: "getAll", href: "/api/v2/expenses", method: "GET" },
                    { rel: "update", href: `/api/v2/expenses/${id}`, method: "PUT" },
                    { rel: "delete", href: `/api/v2/expenses/${id}`, method: "DELETE" },
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async create(req, res, next){
        try{
            const { description, value, date_expense, status, categoria_id, user_id } = req.body;

            const response = await ExpenseService.createExpense(description, value, date_expense, status, categoria_id, user_id);

            if (!response) {
                return res.status(400).json("Erro ao criar despesa!");
            }

            const keys = cache.keys().filter(k => k.startsWith("getAllExpenses"));
            keys.forEach(k => cache.del(k));
            cache.del(["somaTotalExpenses", "somaTotalCategoriaExpenses"]);

            return res.status(201).json({
                message: "Despesa criada com sucesso.", data: response, links: [
                    { rel: "getById", href: `/api/v2/expenses/${response.id}`, method: "GET" },
                    { rel: "getAll", href: "/api/v2/expenses/", method: "GET" },
                    { rel: "update", href: `/api/v2/expenses/${response.id}`, method: "PUT" },
                    { rel: "delete", href: `/api/v2/expenses/${response.id}`, method: "DELETE" }
                ]
            });

        } catch(e){
            next(e);
        }
    }

    async update(req, res, next){
        try {
            const id = req.params.id;
            const { description, value, date_expense, status, categoria_id, user_id } = req.body;

            const response = await ExpenseService.updateExpense(id, description, value, date_expense, status, categoria_id, user_id);
            if (!response) {
                return res.status(400).json("Erro ao atualizar despesa!");
            }

            const keys = cache.keys().filter(k => k.startsWith("getAllExpenses"));
            keys.forEach(k => cache.del(k));
            cache.del(["somaTotalExpenses", "somaTotalCategoriaExpenses"]);

            return res.status(200).json({
                message: "Despesa atualizada com sucesso.", data: response, links: [
                    { rel: "getById", href: `/api/v2/expenses/${response.id}`, method: "GET" },
                    { rel: "getAll", href: "/api/v2/expenses", method: "POST" },
                    { rel: "delete", href: `/api/v2/expenses/${response.id}`, method: "DELETE" }
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;

        const expenseResponse = await ExpenseService.deleteExpense(id);

        const keys = cache.keys().filter(k => k.startsWith("getAllExpenses"));
        keys.forEach(k => cache.del(k));
        cache.del(["somaTotalExpenses", "somaTotalCategoriaExpenses"]);

        return res.status(204).json({
            message: "Despesa Excluída", links: [
                { rel: "getAll", href: `/api/v2/expenses`, method: "GET" },
                { rel: "create", href: "/api/v2/expenses", method: "POST" }
            ]
        });
    }
}

module.exports = new ExpenseController();