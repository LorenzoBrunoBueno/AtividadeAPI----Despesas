const CategoryController = require('../controllers/category');

class CategoryView {
    async getAll(req, res) {
        return await CategoryController.getAll(req, res);
    }
    async create(req, res) {
        return await CategoryController.create(req, res);
    }
    async getById(req, res) {
        return await CategoryController.GetById(req, res);
    }
    async update(req, res) {
        return await CategoryController.update(req, res);
    }
    async delete(req, res) {
        return await  CategoryController.delete(req, res);
    }
}

module.exports = new CategoryView();

