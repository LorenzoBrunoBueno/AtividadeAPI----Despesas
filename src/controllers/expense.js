const Expense = require('../models/expense');

const NodeCache = require('node-cache');
const cache = new NodeCache();

class ExpenseController {
    async getAll(req, res) {
        const cacheExpenses = cache.get("getAllExpenses");
        if (cacheExpenses){
            console.log("retorno do cache!");
            return res.status(200).json({ data: cacheExpenses, links: [
                {rel: "somaTotalDespesas", href: "/api/v1/expenses/summary/total", method: "GET"},
                {rel: "somaTotalDespesasCategoria", href: "/api/v1/expenses/summary/category", method: "GET"},
            ]});
        }

        const expenseResponse = await Expense.getAll();
        if (!expenseResponse) {
            return res.status(200).json("Sem despesas para retornar! Cadastre alguma despesa utilizando o POST!")
        }

        const cached = cache.set("getAllExpenses", expenseResponse);
        if(!cached){
            console.log("Não foi possível cachear a requisição!");
        }

        return res.status(200).json({ data: expenseResponse, links: [
            {rel: "somaTotalDespesas", href: "/api/v1/expenses/summary/total", method: "GET"},
            {rel: "somaTotalDespesasCategoria", href: "/api/v1/expenses/summary/category", method: "GET"},
        ]});
    }
    async GetById(req, res) {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json("Sem Parâmetro ID!");
        }
        if (isNaN(Number(id))) {
            return res.status(400).json("O Parâmetro ID precisa ser um número!");
        }

        const cacheExpenses = cache.get(id);
        if(cacheExpenses){
            console.log("retorno do cache!");
            return res.status(200).json({ data: cacheExpenses, links: [
                {rel: "getAll", href: "/api/v1/expenses", method: "GET"},
                {rel: "updatete", href: `/api/v1/expenses/${id}`, method: "PUT"},
                {rel: "delete", href: `/api/v1/expenses/${id}`, method: "DELETE"},
            ]});
        }

        const expenseResponse = await Expense.getById(id);
        console.log(expenseResponse);
        if (!expenseResponse) {
            return res.status(404).json("Despesa não encontrada!");
        }

        const cached = cache.set(id, expenseResponse);
        if(!cached){
            console.log("Não foi possível cachear a requisição!");
        }

        return res.status(200).json({ data: expenseResponse, links: [
            {rel: "getAll", href: "/api/v1/expenses", method: "GET"},
            {rel: "update", href: `/api/v1/expenses/${id}`, method: "PUT"},
            {rel: "delete", href: `/api/v1/expenses/${id}`, method: "DELETE"},
        ]});
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
        if (!expenseResponse) {
            return res.status(400).json("Erro ao criar despesa!");
        }

        const DelCache = cache.del(["getAllExpenses", "somaTotalExpenses", "somaTotalCategoriaExpenses"]);
    
        return res.status(201).json({ message: "Despesa criada com sucesso.", data: expenseResponse, links: [
            {rel: "getById", href: `/api/v1/expenses/${expenseResponse.id}`, method: "GET"},
            {rel: "update", href: `/api/v1/expenses/${expenseResponse.id}`, method: "PUT"},
            {rel: "delete", href: `/api/v1/expenses/${expenseResponse.id}`, method: "DELETE"}
        ]});
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
        if (!expenseResponse) {
            return res.status(400).json("Erro ao atualizar despesa!");
        }

        const DelCache = cache.del([id, "getAllExpenses", "somaTotalExpenses", "somaTotalCategoriaExpenses"]);

        return res.status(200).json({message: "Despesa atualizada com sucesso.", data: expenseResponse, links: [
            {rel: "getById", href: `/api/v1/expenses/${expenseResponse.id}`, method: "GET"},
            {rel: "create", href: "/api/v1/expenses", method: "POST"},
            {rel: "delete", href: `/api/v1/expenses/${expenseResponse.id}`, method: "DELETE"}
         ]});
    }
    async delete(req, res) {
        const id = req.params.id;
        const expenseResponse = await Expense.delete(id);
        if (!expenseResponse) {
            return res.status(404).json("Despesa não encontrada!");
        }

        const DelCache = cache.del(["getAllExpenses", "somaTotalExpenses", "somaTotalCategoriaExpenses"]);

        return res.status(200).json({ message: "Despesa Excluída", data: expenseResponse, links: [
            {rel: "getAll", href: `/api/v1/expenses`, method: "GET"},
            {rel: "create", href: "/api/v1/expenses", method: "POST"}
         ]});
    }
    async somaTotalDespesas(req, res) {
        const cacheTotalExpenses = cache.get("somaTotalExpenses");
        if(cacheTotalExpenses){
            console.log("retorno do cache!");
            return res.status(200).json({message: "Soma total do valor das despesas", data: cacheTotalExpenses, links: [
                    {rel: "getAll", href: `/api/v1/expenses`, method: "GET"},
                    {rel: "somaTotalDespesasCategoria", href: "/api/v1/expenses/summary/category", method: "GET"},
            ]});
        }

        const somaTotal = await Expense.somaTotalDespesas();
        if (!somaTotal) {
            return res.status(400).json("Erro ao calcular soma total de despesas!");
        }

        const cached = cache.set("somaTotalExpenses", somaTotal);
        if(!cached){
            console.log("Não foi possível cachear a requisição!");
        }

        return res.status(200).json({message: "Soma total do valor das despesas", data: somaTotal, links: [
                {rel: "getAll", href: `/api/v1/expenses`, method: "GET"},
                {rel: "somaTotalDespesasCategoria", href: "/api/v1/expenses/summary/category", method: "GET"},
        ]});
    }
    async somaTotalDespesasCategoria(req, res) {
        const cacheTotalCategoriaExpenses = cache.get("somaTotalCategoriaExpenses");
        if(cacheTotalCategoriaExpenses){
            console.log("retorno do cache!");
            return res.status(200).json({message: "Soma total do valor das despesas por categoria", data: cacheTotalCategoriaExpenses, links: [
                {rel: "getAll", href: `/api/v1/expenses`, method: "GET"},
                {rel: "somaTotalDespesas", href: "/api/v1/expenses/summary/total", method: "GET"},
            ]});
        }

        const somaTotalCategoria = await Expense.somaTotalDespesasCategoria();
        if (!somaTotalCategoria) {
            return res.status(400).json("Erro ao calcular soma total de despesas!");
        }

        const cached = cache.set("somaTotalCategoriaExpenses", somaTotalCategoria);
        if(!cached){
            console.log("Não foi possível cachear a requisição!");
        }

        return res.status(200).json({message: "Soma total do valor das despesas por categoria", data: somaTotalCategoria, links: [
                {rel: "getAll", href: `/api/v1/expenses`, method: "GET"},
                {rel: "somaTotalDespesas", href: "/api/v1/expenses/summary/total", method: "GET"},
        ]});
    }
}

module.exports = new ExpenseController();