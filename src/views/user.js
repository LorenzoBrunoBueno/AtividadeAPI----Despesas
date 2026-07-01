const UserController = require('../controllers/user');

class UserView {
    async login(req, res, next){
        return await UserController.login(req, res, next);
    }
    async getAll(req, res, next) {
        return await UserController.getAll(req, res, next);
    }
    async create(req, res, next) {
        return await UserController.create(req, res, next);
    }
    async getById(req, res, next) {
        return await UserController.GetById(req, res, next);
    }
    async update(req, res, next) {
        return await UserController.update(req, res, next);
    }
    async delete(req, res, next) {
        return await UserController.delete(req, res, next);
    }
    async somaTotalDespesas(req, res, next) {
        return await UserController.somaTotalDespesas(req, res, next);
    }
    async somaTotalDespesasCategoria(req, res, next) {
        return await UserController.somaTotalDespesasCategoria(req, res, next);
    }
}

module.exports = new UserView();

