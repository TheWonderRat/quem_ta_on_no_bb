"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const bcryptjs_1 = require("bcryptjs");

const auth_1 = __importDefault(require("../../../config/auth"));

//import { UserRepository } from '../entity/UserRepository'
const UserEntity_1 = require("../entity/UserEntity");
const index_1 = __importDefault(require("../../../shared/typeorm/index"));
const jsonwebtoken = require('jsonwebtoken');
class CriarSessaoService {
    //not sure if I should use any here...
    //TODO:: later I should return, or a class of user, or an instance of AppError 
    async execute({ login, senha }) {
        const usuario = await index_1.myDataSource
            .getRepository(UserEntity_1.User)
            .createQueryBuilder("usuario")
            .where("usuario.inscricao = :login", { login })
            .getOne();
        if (!usuario) {
            return new AppError_1.default("Usuario nao foi encontrado!", 401);
        }
        const hashedPswd = await (0, bcryptjs_1.compare)(senha, usuario.senha);
        if (!hashedPswd) {
            return new AppError_1.default("Combicanao usuario/senha nao confere!", 401);
        }
        //TODO:: sobrescrever os tipos do typescript para suportar o retorno do token
        const token = await jsonwebtoken.sign({
            usuario: usuario.inscricao,
        }, auth_1.default.jwt.secret, {
            subject: usuario.inscricao,
            expiresIn: auth_1.default.jwt.expiresIn,
        });
        return { token, message: `sessao de ${usuario.nome} criada com sucesso!` };
    }
}
exports.default = CriarSessaoService;
