#  README do Projeto
#  Alunos - Lorenzo Bruno Bueno
#  Curso - Análise e Desenvolvimento de Sistemas
#  Link do Projeto no Github: https://github.com/LorenzoBrunoBueno/AtividadeAPI----Despesas.git

# Descrição do Projeto

## OBJETIVO DA API
 - Desenvolver Endpoints funcionais para visualização, cadastro, alteração, remoção e outras operações para um sistema de registro para     despesas, armazenando esses dados em um array ou arquivo.json (nesse caso um arquivo json) .

## TECNOLOGIAS UTILIZADAS
 - NPM
 - Node.js
 - Postman
 - Express.js
 - Biblioteca File System do Node.js
 - Visual Studio Code

## EXECUTANDO:
 - clone o repositório do github utilizando: git clone https://github.com/LorenzoBrunoBueno/AtividadeAPI----Despesas.git
 - dentro da pasta AtividadeAPI----Despesas, rode o comando: npm install.
 - depois, neste mesmo terminal, rode o comando configurado dentro do package.json: npm start .
 - pronto, o servidor já está rodando.

 ## TESTANDO
 - Depois efetuar a etapa acima, o servidor estará rodando na porta 3000, em http://localhost:3000.

 - Molde para o body das requisições POST e PUT no Postman:

{
    "title": "",
    "amount": ,
    "category": "",
    "date": "AAAA-MM-DD",
    "description": ""
}

 ## ROTAS DA API

    + -------------------------------------------------------------------------------------------------- +
    |  Método  |            Rota            |                         Descrição                          |
    | ________ | __________________________ | __________________________________________________________ |
    | - GET    | /expenses                  | Pegar todas as despesas.                                   |
    | - GET    | /expenses/:id              | Pegar uma despesa em específico, pelo ID.                  |
    | - GET    | /expenses/summary/total    | Pegar o valor somado total das despesas.                   |
    | - GET    | /expenses/summary/category | Pegar o valor somado total das despesas de cada categoria. |
    | - POST   | /expenses                  | Cadastrar uma despesa.                                     |
    | - PUT    | /expenses/:id              | Alterar as Informações de uma despesa pelo ID.             |
    | - DELETE | /expenses/:id              | Deletar uma despesa em específico pelo ID.                 |
    + -------------------------------------------------------------------------------------------------- +

## MODELO DE DADOS

### Entidade Expense/Despesa

    + ----------------------------------------------------------------- +
    |                             Expense                               |
    | _________________________________________________________________ |
    |    Nome     |                        Atributos                    |
    | ___________ | ___________________________________________________ |
    | id          | Primary Key, Auto_Increment, NOT NULL, INT UNSIGNED |
    | title       | String, NOT NULL                                    |
    | amount      | Float, UNSIGNED, NOT NULL                           | 
    | category    | String                                              |
    | date        | Date, NOT NULL, > Date.now()                        |
    | description | String                                              |
    | createdAt   | Datetime NOT NULL                                   |  
    + ----------------------------------------------------------------- +

## EXEMPLOS DE REQUISIÇÃO

### Requisições feitas no Postman

- Pegando todas as despesas:
 - GET http://localhost:3000/expenses
 - Resp:
    [{"id":0,"title":"Remédios da Vovó","amount":200,"category":"Remédios","date":"1999-02-24","description":"Remédios da Vovó","createdAt":"2026-03-24T22:49:34.807Z"},{"id":1,"title":"Remédios do Netinho","amount":1010,"category":"Remédios","date":"2020-03-02","description":"Remédios do Vovô","createdAt":"2026-03-24T22:50:12.620Z"},{"id":2,"title":"Remédios do Vovô","amount":2000,"category":"Remédios","date":"2015-02-24","description":"Remédios do Vovô","createdAt":"2026-03-24T23:05:08.706Z"},{"id":3,"title":"Compras do Supermercado","amount":1500,"category":"Mantimentps","date":"2001-02-24","description":"Compras do Supermercado","createdAt":"2026-03-24T23:06:42.301Z"},{"id":4,"title":"Compras de Verduras","amount":350,"category":"Mantimentps","date":"2011-02-24","description":"Compras da Verdureira","createdAt":"2026-03-24T23:10:44.409Z"},{"id":5,"title":"Compras de Suplementos","amount":350,"category":"Mantimentps","date":"2002-02-24","description":"Compras da Growth","createdAt":"2026-03-24T23:12:08.977Z"}]

- Pegando uma em específico:
 - GET http://localhost:3000/expenses/2
 - Resp:
    {"id":2,"title":"Remédios do Vovô","amount":2000,"category":"Remédios","date":"2015-02-24","description":"Remédios do Vovô","createdAt":"2026-03-24T23:05:08.706Z"}

- Pegando o valor somado total dos campos "amount" das despesas: 
 - GET http://localhost:3000/expenses/summary/total
 - Resp:
    5410

- Pegando o valor somado de todos os campos "amount", divididos por categoria:
 - GET http://localhost:3000/expenses/summary/category
 - Resp: 
    {"categoria":"Remédios","categoriaAmount":3210},{"categoria":"Mantimentps","categoriaAmount":2200}

- Cadastrando uma despesa:
 - POST http://localhost:3000/expenses
 - Body: 
        {
            "title": "Remédios do Vovô",
            "amount": 1000,
            "category": "Remédios",
            "date": "2010-02-24",
            "description": "Remédios do Vovô"
        }
 - Resp:
    {"id":1,"title":"Remédios do Vovô","amount":1000,"category":"Remédios","date":"2010-02-24","description":"Remédios do Vovô","createdAt":"2026-03-24T22:50:12.620Z"}

- Alterando dados de uma despesa:
 - PUT http://localhost:3000/expenses/17
 - Body: 
        {
            "title": "Remédios do Netinho",
            "amount": 1010,
            "category": "",
            "date": "2020-03-02",
            "description": ""
        }      
 - Resp:
    {"id":1,"title":"Remédios do Netinho","amount":1010,"category":"Remédios","date":"2020-03-02","description":"Remédios do Vovô","createdAt":"2026-03-24T22:50:12.620Z"}
    ## VEJA A SEÇÃO DE "NOTAS" NO FIM DO DOCUMENTO PARA ENTENDER MELHOR COMO E QUAIS CAMPOS PODEM SER ALTERADOS DURANTE A EXECUÇÃO DO "PUT"!!!

- Deletando uma despesa:
 - DELETE http://localhost:3000/expenses/17
 - Resp:
    "Despesa Excluída"

# MELHORIAS 

- Analisar mais a fundo a formatação dos campos para responder de acordo, como o formato de data (AAAA/MM/DD).
- Transformar a ação de pegar os dados do arquivo, colocando cada registro dentro de um array, em uma função para reduzir repetição do código e facilitar reutilização.
- Adicionar Filtros no get das despesas, como por categoria, data específica, período e etc.
- Utilizar apenas a linguagem inglesa na construção das funções, vairáveis e operações para padronizar o projeto com boas práticas.

# NOTAS 
## PUT
- Tirando "id" e "createdAt", todos os outros campos podem ser alterados.
- Você pode escolher alterar alguns campos, mantendo outros como eram anteriormente.
  - Para fazer isso basta deixar o campo que você não quer alterar como "", exemplo:
    {
        "title": "Remédios do Vovô",
        "amount": 250,
        "category": "",
        "date": "",
        "description": ""
    }
  - Nessa requisição somente os campos "title" e "amount" estão sendo alterados, os outros que estão com "", permanecem como eram antes.
  - A única exceção é o campo amount, que deve ter seu valor colocado novamente em todas as requisições.  
