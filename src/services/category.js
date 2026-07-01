const CategoryModel = require('../models/category');
const crypto = require('node:crypto');
const bycrpt = require('bcrypt');
const User = require('../models/user');

class CategoryService {

    constructor() { }

    async getAll() {
        const response = await CategoryModel.findAll();
        
        if(!response){
            throw new Error('Sem categorias cadastradas!');
        }
        
        return response
    }

    async createCategory(name, description) {

        if(!name || !description){
            throw new Error('Envie todas as informções');
        }

        const id = crypto.randomUUID();
        return await CategoryModel.create({id, name, description});
    }

    async getById(id) {

        const response = await CategoryModel.findByPk(id);
        
        if(!response){
            throw new Error('Categoria não encontrada!');
        }
        
        return response
    }

    async updateCategory(id, name, description) {

        if(!id || !name || !description){
            throw new Error('Envie todas as informações!');
        }

        const category = await this.getById(id);

        if (!category) {
            return null
        }

        category.name = name
        category.description = description

        await category.save();
        return category;
    }

    async deleteCategory(id) {

        if(!id){
            throw new Error('Envie um id!');
        }

        const category = await this.getById(id);

        if (!category) {
            return null
        }

        await category.destroy();
        return null;
    }
}

module.exports = new CategoryService();