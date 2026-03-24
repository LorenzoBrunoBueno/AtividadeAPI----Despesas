const express = require('express');
const Despesa = require('./src/models/expense');
const app = express()

app.use(express.json());

/*
    Rotas do Programa:

    Pegar Todas as Despesas
    Linha 42 até 50

    Pegar uma despesa pelo id
    Linha 53 até 63 

    Cadastrar uma Despesa
    Linha 66 até 88

    Alterar uma Despesa
    Linha 91 até 107

    Deletar uma Despesa
    Linha 110 até 119

    Soma de todas as despesas
    Linha 122 até 125

    Soma de todas as despesas por categoria
    Linha 128 até 131

    Rodando servidor
    Linha 134 até 136

*/
 

app.get('/', (req, res) => {
    return res.status(200).json("Verifique as rotas presentes no arquivo README do projeto!");
})


app.get('/despesas', async (req, res) => {
    const despesas = await Despesa.getAll();

    if (despesas === null){
        return res.status(200).json("Sem despesas para retornar! Cadastre alguma despesa utilizando o POST!")
    }

    return res.status(200).json(despesas);
})


app.get('/despesas/:id', async (req, res) => {
    let idDespesa = req.params.id

    const despesas = await Despesa.getById(idDespesa);

    if (despesas === null){
        return res.status(404).json("Despesa não encontrada!");
    }

    res.status(200).json(despesas);
})


app.post('/despesas', async (req, res) => {
    const {title, amount, category, date, description} = req.body;

    if (!title){
        console.log("O Campo 'title' é obrigatório!");
        return res.status(400).json("O Campo 'title' é obrigatório!");
    }

    if (amount <= 0){
        return res.status(400).json("O Campo 'Amount' deve ser maior que zero!");
    }

    let dataHoje = Date.now();
    let dataParse = Date.parse(date);
    if (dataParse > dataHoje){
        return res.status(400).json("Registre apenas contas passadas ou de hoje!");
    }

    const despesa = await Despesa.create(title, amount, category, date, description);

    console.log(despesa);
    res.status(201).json(despesa);
})


app.put('/despesas/:id', async (req, res) => {
    const {title, amount, category, date, description} = req.body;

    if (amount <= 0){
        return res.status(400).json("O Campo 'Amount' deve ser maior que zero!");
    }

    let dataHoje = Date.now();
    let dataParse = Date.parse(date);
    if (dataParse > dataHoje){
        return res.status(400).json("Registre apenas contas passadas ou de hoje!");
    }
 
    const despesa = await Despesa.update(Number(req.params.id), title, amount, category, date, description);

    res.status(200).json(despesa);
})


app.delete('/despesas/:id', async (req, res) => {
    const selecExpense = await Despesa.delete(Number(req.params.id));

    if (selecExpense === -1){
        console.log("Despesa não encontrada!")
        return res.status(404).json("Despesa não encontrada!");
    };

    res.status(200).json("Despesa Excluída", selecExpense);
})


app.get('/despesas/summary/total', async (req, res) => {
    const somaTotal = await Despesa.somaTotalDespesas();
    return res.status(200).json(somaTotal);
})


app.get('/despesas/summary/category', async (req, res) => {
    const somaTotalCategoria = await Despesa.somaTotalDespesasCategoria();
    return res.status(200).json(somaTotalCategoria);
})


app.listen(3000, () => {
    console.info("Servidor Rodando na porta 3000");
})