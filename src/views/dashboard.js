const DashboardController = require('../controllers/dashboard');

class DashboardView {
    async countExpenses(req, res) {
     return await DashboardController.countExpenses(req, res);
    }
    async byCategoryExpenses(req, res) {
        return await DashboardController.byCategoryExpenses(req, res);
    }
    async totalExpenses(req, res) {
        return await DashboardController.totalExpenses(req, res);
    }
}

module.exports = new DashboardView();