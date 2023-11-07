"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const bcryptjs_1 = require("bcryptjs");
const index_1 = require("../../../shared/typeorm/index");
const UserEntity_1 = require("../entity/UserEntity");
class AtivarContaService {
    //not sure if I should use any here...
    //TODO:: later I should return, or a class of user, or an instance of AppError 
    async execute({ login, senha, novaSenha }) {
        const usuario = await index_1.myDataSource
            .getRepository(UserEntity_1.User)
            .createQueryBuilder("usuario")
            .where("usuario.inscricao = :login", { login })
            .getOne();
        if (!usuario) {
            return new AppError_1.default("Usuario nao encontrado", 401);
        }
        const hashedPassword = await (0, bcryptjs_1.compare)(senha, usuario.senha);
        if (!hashedPassword) {
            return new AppError_1.default("Combinacao usuario/senha nao confere!", 401);
        }
        //TODO:: Colocar o salt em uma nova constante
        const newPswd = await (0, bcryptjs_1.hash)(novaSenha, 8);
        await index_1.myDataSource
            .createQueryBuilder()
            .update(UserEntity_1.User)
            .set({ senha: newPswd })
            .where("inscricao = :login", { login })
            .execute();
        return { token: `conta de ${usuario.nome} Ativado com sucesso!` };
        //return { token : `${usuario.nome} Ativado com sucesso!`}
    }
}
exports.default = AtivarContaService;
