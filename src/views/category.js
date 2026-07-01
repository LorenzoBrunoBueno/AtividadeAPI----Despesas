const CategoryController = require('../controllers/category');

class CategoryView {
    async getAll(req, res, next) {
        return await CategoryController.getAll(req, res, next);
    }
    async create(req, res, next) {
        return await CategoryController.create(req, res, next);
    }
    async getById(req, res, next) {
        return await CategoryController.getById(req, res, next);
    }
    async update(req, res, next) {
        return await CategoryController.update(req, res, next);
    }
    async delete(req, res, next) {
        return await  CategoryController.delete(req, res, next);
    }
}

module.exports = new CategoryView();

