const CategoryService = require('../services/category');

const NodeCache = require('node-cache');
const cache = new NodeCache();


class CategoryController {
    async getAll(req, res, next) {
        try {
            const cacheCategory = cache.get("getAllCategories");

            if (cacheCategory) {
                console.log("retorno do cache!");
                return res.status(200).json({
                    data: cacheCategory, links: [
                        { rel: "somaTotalDespesas", href: "/api/v2/categories/summary/total", method: "GET" },
                        { rel: "somaTotalDespesasCategoria", href: "/api/v2/categories/summary/category", method: "GET" },
                    ]
                });
            }

            const response = await CategoryService.getAll();

            const cached = cache.set("getAllCategories", response);

            if (!cached) {
                console.log("Não foi possível cachear a requisição!");
            }

            return res.status(200).json({
                data: response, links: [
                    { rel: "create", href: "/api/v2/categories", method: "POST" },
                    { rel: "somaTotalDespesas", href: "/api/v2/categories/summary/total", method: "GET" },
                    { rel: "somaTotalDespesasCategoria", href: "/api/v2/categories/summary/category", method: "GET" },
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async getById(req, res, next){
        try {
            const id = req.params.id;

            const cacheCategory = cache.get(id);
            if (cacheCategory) {
                console.log("retorno do cache!");
                return res.status(200).json({
                    data: cacheCategory, links: [
                        { rel: "getAll", href: "/api/v2/categories", method: "GET" },
                        { rel: "update", href: `/api/v2/categories/${id}`, method: "PUT" },
                        { rel: "delete", href: `/api/v2/categories/${id}`, method: "DELETE" },
                    ]
                });
            }

            const response = await CategoryService.getById(id);

            const cached = cache.set(id, response);
            if (!cached) {
                console.log("Não foi possível cachear a requisição!");
            }

            return res.status(200).json({
                data: response, links: [
                    { rel: "getAll", href: "/api/v2/categories", method: "GET" },
                    { rel: "update", href: `/api/v2/categories/${id}`, method: "PUT" },
                    { rel: "delete", href: `/api/v2/categories/${id}`, method: "DELETE" },
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async create(req, res, next){
        try{
            const { name, description } = req.body;

            const response = await CategoryService.createCategory(name, description);

            if (!response) {
                return res.status(400).json("Erro ao criar categoria!");
            }

            cache.del("getAllCategories");

            return res.status(201).json({
                message: "Despesa criada com sucesso.", data: response, links: [
                    { rel: "getById", href: `/api/v2/categories/${response.id}`, method: "GET" },
                    { rel: "getAll", href: "/api/v2/categories/", method: "GET" },
                    { rel: "update", href: `/api/v2/categories/${response.id}`, method: "PUT" },
                    { rel: "delete", href: `/api/v2/categories/${response.id}`, method: "DELETE" }
                ]
            });

        } catch(e){
            next(e);
        }
    }

    async update(req, res, next){
        try {
            const id = req.params.id;
            const { name, description } = req.body;

            const response = await CategoryService.updateCategory(id, name, description);

            if (!response) {
                throw new Error("Erro ao atualizar categoria!");
            }

            cache.del([id, "getAllCategories"]);

            return res.status(200).json({
                message: "Despesa atualizada com sucesso.", data: response, links: [
                    { rel: "getById", href: `/api/v2/categories/${response.id}`, method: "GET" },
                    { rel: "getAll", href: "/api/v2/categories", method: "POST" },
                    { rel: "delete", href: `/api/v2/categories/${response.id}`, method: "DELETE" }
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;

        const categoryResponse = await CategoryService.deleteCategory(id);

        cache.del(["getAllCategories"]);

        return res.status(204).json({
            message: "Despesa Excluída", links: [
                { rel: "getAll", href: `/api/v2/categories`, method: "GET" },
                { rel: "create", href: "/api/v2/categories", method: "POST" }
            ]
        });
    }
}

module.exports = new CategoryController();