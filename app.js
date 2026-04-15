const express = require('express');
const expense = require('./src/views/expense');
const app = express()

app.use(express.json());

app.get('/expenses', expense.getAll)

app.get('/expenses/summary/total', expense.somaTotalDespesas)

app.get('/expenses/summary/category', expense.somaTotalDespesasCategoria)

app.get('/expenses/:id', expense.getById)

app.post('/expenses', expense.create)

app.put('/expenses/:id', expense.update)

app.delete('/expenses/:id', expense.delete)

app.listen(3000, () => {
    console.info("Servidor Rodando na porta 3000");
})
