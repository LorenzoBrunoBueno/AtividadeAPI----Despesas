const DashboardService = require('../services/dashboard');

class DashboardController {
    constructor () {}

    async countExpenses(req, res){
        try {
            const response = await DashboardService.countExpenses();
            return res.status(200).json({quantidade: response});
        } catch (e) {
            next(e);
        }
    }

    async byCategoryExpenses(req, res){
        try {
            const response = await DashboardService.byCategoryExpenses();
            return res.status(200).json(response);            
        } catch (e) {
            next(e);
        }
    }

    async totalExpenses(req, res){
        try {
            const response = await DashboardService.totalExpenses();
            return res.status(200).json({total: response});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new DashboardController();