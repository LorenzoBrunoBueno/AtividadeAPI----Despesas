const express = require('express');
const expense = require('./src/views/expense');
const app = express()
const baseUrl = '/api/v1'

app.use(express.json());

app.get(`${baseUrl}/expenses`, expense.getAll)

app.get(`${baseUrl}/expenses/summary/total`, expense.somaTotalDespesas)

app.get(`${baseUrl}/expenses/summary/category`, expense.somaTotalDespesasCategoria)

app.get(`${baseUrl}/expenses/:id`, expense.getById)

app.post(`${baseUrl}/expenses`, expense.create)

app.put(`${baseUrl}/expenses/:id`, expense.update)

app.delete(`${baseUrl}/expenses/:id`, expense.delete)

app.listen(3000, () => {
    console.info("Servidor Rodando na porta 3000");
})
