const express = require('express');
const expense = require('./src/views/expense');
//const { Sequelize } = require('sequelize');
const app = express()
const baseUrl = '/api/v1'

//const sequelize = new Sequelize('sqlite:::memory:', {logging: console.log});

app.use(express.json());

app.get(`${baseUrl}/expenses`, expense.getAll)

app.get(`${baseUrl}/expenses/summary/total`, expense.somaTotalDespesas)

app.get(`${baseUrl}/expenses/summary/category`, expense.somaTotalDespesasCategoria)

app.get(`${baseUrl}/expenses/:id`, expense.getById)

app.post(`${baseUrl}/expenses`, expense.create)

app.put(`${baseUrl}/expenses/:id`, expense.update)

app.delete(`${baseUrl}/expenses/:id`, expense.delete)

async function main() {
    try {
        //await sequelize.authenticate();
        app.listen(3000, () => {
            console.info("Servidor Rodando na porta 3000");
        })
    } catch (error) {
        console.log(error)
    }
}

main();


