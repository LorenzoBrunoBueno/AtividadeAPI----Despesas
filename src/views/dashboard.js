const DashboardController = require('../controllers/dashboard');

class DashboardView {
    async countExpenses(req, res, next) {
     return await DashboardController.countExpenses(req, res, next);
    }
    async byCategoryExpenses(req, res, next) {
        return await DashboardController.byCategoryExpenses(req, res, next);
    }
    async totalExpenses(req, res, next) {
        return await DashboardController.totalExpenses(req, res, next);
    }
}

module.exports = new DashboardView();