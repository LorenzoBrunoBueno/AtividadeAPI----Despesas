const UserService = require('../services/user');

const NodeCache = require('node-cache');
const cache = new NodeCache();


class UserController {

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const response = await UserService.login(email, password);
            return res.status(200).json({data: response});
        } catch(e) {
            next(e);
        }
    }


    async getAll(req, res, next) {
        try {
            const cacheUsers = cache.get("getAllUsers");

            if (cacheUsers) {
                console.log("retorno do cache!");
                return res.status(200).json({
                    data: cacheUsers, links: [
                        { rel: "somaTotalDespesas", href: "/api/v2/users/summary/total", method: "GET" },
                        { rel: "somaTotalDespesasCategoria", href: "/api/v2/users/summary/category", method: "GET" },
                    ]
                });
            }

            const response = await UserService.getAll();

            const cached = cache.set("getAllUsers", response);

            if (!cached) {
                console.log("Não foi possível cachear a requisição!");
            }

            return res.status(200).json({
                data: response, links: [
                    { rel: "create", href: "/api/v2/users", method: "POST" },
                    { rel: "somaTotalDespesas", href: "/api/v2/users/summary/total", method: "GET" },
                    { rel: "somaTotalDespesasCategoria", href: "/api/v2/users/summary/category", method: "GET" },
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async getById(req, res, next){
        try {
            const id = req.params.id;

            const cacheUsers = cache.get(id);
            if (cacheUsers) {
                console.log("retorno do cache!");
                return res.status(200).json({
                    data: cacheUsers, links: [
                        { rel: "getAll", href: "/api/v2/users", method: "GET" },
                        { rel: "update", href: `/api/v2/users/${id}`, method: "PUT" },
                        { rel: "delete", href: `/api/v2/users/${id}`, method: "DELETE" },
                    ]
                });
            }

            const response = await UserService.getById(id);

            const cached = cache.set(id, response);
            if (!cached) {
                console.log("Não foi possível cachear a requisição!");
            }

            return res.status(200).json({
                data: response, links: [
                    { rel: "getAll", href: "/api/v2/users", method: "GET" },
                    { rel: "update", href: `/api/v2/users/${id}`, method: "PUT" },
                    { rel: "delete", href: `/api/v2/users/${id}`, method: "DELETE" },
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async create(req, res, next){
        try{
            const { name, email, password } = req.body;

            const response = await UserService.createUser(name, email, password);

            if (!response) {
                return res.status(400).json("Erro ao criar usuario!");
            }

            cache.del("getAllUsers");

            return res.status(201).json({
                message: "Despesa criada com sucesso.", data: response, links: [
                    { rel: "getById", href: `/api/v2/users/${response.id}`, method: "GET" },
                    { rel: "getAll", href: "/api/v2/users/", method: "GET" },
                    { rel: "update", href: `/api/v2/users/${response.id}`, method: "PUT" },
                    { rel: "delete", href: `/api/v2/users/${response.id}`, method: "DELETE" }
                ]
            });

        } catch(e){
            next(e);
        }
    }

    async update(){
        try {
            const id = req.params.id;
            const { name, email, password } = req.body;

            const response = await UserService.updateUser(id, name, email, password);

            if (!response) {
                throw new Error("Erro ao atualizar usuario!");
            }

            cache.del([id, "getAllUsers"]);

            return res.status(200).json({
                message: "Despesa atualizada com sucesso.", data: response, links: [
                    { rel: "getById", href: `/api/v2/users/${response.id}`, method: "GET" },
                    { rel: "getAll", href: "/api/v2/users", method: "POST" },
                    { rel: "delete", href: `/api/v2/users/${response.id}`, method: "DELETE" }
                ]
            });

        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;

        const userResponse = await UserService.deleteUser(id);

        cache.del(["getAllUsers"]);

        return res.status(204).json({
            message: "Despesa Excluída", links: [
                { rel: "getAll", href: `/api/v2/users`, method: "GET" },
                { rel: "create", href: "/api/v2/users", method: "POST" }
            ]
        });
    }
}

module.exports = new UserController();