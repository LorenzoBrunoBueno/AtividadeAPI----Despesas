const UserModel = require('../models/user');
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');


class UserService {

    constructor () {}

    async login(email, password){

        if(!email || !password){
            throw new Error('Insira todas as informações de login!');
        }

        const user = await UserModel.findOne({ where: { email: email }});

        if (!user){
            throw new Error("Email ou Senha inválidos!");
        }

        const valid = await bcrypt.compare(password, user.password_hash);

        if(!valid){
            throw new Error("Email ou Senha inválidos!");
        }

        const token = jwt.sign(
            {id: user.id, name: user.name, email: user.email }, config.jwt.secret, {expiresIn: config.jwt.expiresIn }
        )

        return { token, user };

    }
    
    async getAll(){        
        const response = await UserModel.findAll({ include: [{ association: 'expenses' }] });
        
        if(!response){
            throw new Error('Não existem usuários cadastrados!');
        }
        
        return response
    }

    async createUser(name, email, password){

        if(!name || !email || !password){
            throw new Error('Envie todos os dados');
        }

        const id = crypto.randomUUID();
        const password_hash = await bcrypt.hash(password, 10);
        console.log({name, email, password});
        return await UserModel.create({id, name, email, password_hash});
    }

    async getUserById(id){
        const response = await UserModel.findByPk(id, { include: [{ association: 'expenses' }] });
       
        if(!response){
            throw new Error('Usuário não encontrado!');
        }

        return response;

    }

    async updateUser(id, name, email, password){

        if (!id || !name || !email || !password) {
            throw new Error('Envie todos os dados');
        }

        const user = await this.getUserById(id);

        if (!user) {
            return null
        }

        user.name = name
        user.email = email

        if (password) {
            const password_hash = await bcrypt.hash(password, 10);
            user.password_hash = password_hash;
        }

        await user.save();
        return user;
    }

    async deleteUser(id){

        if(!id){
            throw new Error('Envie um id');
        }

        const user = await this.getUserById(id);

        if(!user){
            return null
        }
        
        await user.destroy();
        return null;
    }
}

module.exports = new UserService();