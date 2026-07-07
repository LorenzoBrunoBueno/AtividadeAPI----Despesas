const express = require('express');
require('./src/models/associations');
const ExpenseRoutes = require('./src/routes/expenses');
const AuthRoutes = require('./src/routes/auth');
const CategoryRoutes = require('./src/routes/category');
const DashboardRoutes = require('./src/routes/dashboard');
const app = express()
const cors = require('cors');
const baseUrl = '/api/v2'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${baseUrl}/`, AuthRoutes);
app.use(`${baseUrl}/categories`, CategoryRoutes);
app.use(`${baseUrl}/expenses`, ExpenseRoutes);
app.use(`${baseUrl}/dashboard`, DashboardRoutes);
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    console.log(err);
    res.status(status).json({ error: err.message });
});



async function main() {
    try {
        app.listen(3000, () => {
            console.info("Servidor Rodando na porta 3000");
        })
    } catch (error) {
        console.log(error)
    }
}

main();


