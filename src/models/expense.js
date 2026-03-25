const fs = require('fs').promises;

async function lerArquivo(){
    try{
        const data = await fs.readFile('BancoDeDados.json', "utf8");
        return data ? JSON.parse(data) : [];
    }catch (e){
        return null
    }
}

async function escreverArquivo(data){
    try{
        await fs.writeFile("BancoDeDados.json", JSON.stringify(data, null, 2), "utf8")
    }catch(e){
        console.error(e)
        return
    }
}

class Expense{

    getAll(){
        return lerArquivo();
    }

    async getById(id){
        const conteudoArquivo = await lerArquivo();
        const despesa = conteudoArquivo.find(o => Number(o.id) === Number(id));
        return despesa;
    }

    async create(title, amount, category, date, description){
        const conteudoArquivo = await lerArquivo();
        const expenses = [];
        let idDespesa = 0;

        for(var o in conteudoArquivo){
            expenses.push(conteudoArquivo[o]);
        }

        if (expenses.length >= 1){
            idDespesa = expenses.length;
        }

        const newExpense = {
            id: idDespesa,
            title,
            amount,
            category,
            date,
            description,
            createdAt: new Date(Date.now())
        }

        expenses.push(newExpense);
        escreverArquivo(expenses);
        return newExpense
    }

    async update(id, title, amount, category, date, description){
        const conteudoArquivo = await lerArquivo();
        const expenses = [];

        for(var o in conteudoArquivo){
            expenses.push(conteudoArquivo[o]);
        }
        
        const selecExpense = expenses.findIndex(d => d.id === id);

        if (title == ""){
            title = expenses[selecExpense].title;
        }
        if (category == ""){
            category = expenses[selecExpense].category;
        }
        if (date == ""){
            date = expenses[selecExpense].date;
        }
        if (description == ""){
            description = expenses[selecExpense].description;
        }

        expenses[selecExpense] = {
            ...expenses[selecExpense],
            title, amount, category, date, description
        }

        escreverArquivo(expenses);
        return expenses[selecExpense];
    }

    async delete(id){
        const conteudoArquivo = await lerArquivo();
        const expenses = [];

        for(var o in conteudoArquivo){
            expenses.push(conteudoArquivo[o]);
        }

        const selecExpense = expenses.findIndex(d => d.id === id);

        expenses.splice(selecExpense, 1);

        console.log("Despesa Excluida");
        escreverArquivo(expenses);
        return selecExpense;
    }

    async somaTotalDespesas(){
        const conteudoArquivo = await lerArquivo();
        let totalDespesas = 0;

        for(var o in conteudoArquivo){
            totalDespesas = totalDespesas + conteudoArquivo[o].amount;
        }

        return totalDespesas;
    }

    async somaTotalDespesasCategoria(){
        const conteudoArquivo = await lerArquivo();

        const arrayCategoriasDespesas = [];

        for(var o in conteudoArquivo){

            let temCategoria = false;

            for (var c in arrayCategoriasDespesas){
                if (conteudoArquivo[o].category === arrayCategoriasDespesas[c].categoria){
                    arrayCategoriasDespesas[c].categoriaAmount = arrayCategoriasDespesas[c].categoriaAmount + conteudoArquivo[o].amount;
                    temCategoria = true;
                }
            }

            if (!temCategoria){
                let categoria = conteudoArquivo[o].category;
                let categoriaAmount = conteudoArquivo[o].amount;
                let CategoriaObj = {
                    categoria,
                    categoriaAmount
                };
                arrayCategoriasDespesas.push(CategoriaObj)
            }
        }

        return arrayCategoriasDespesas;
    }
}

module.exports = new Expense();
