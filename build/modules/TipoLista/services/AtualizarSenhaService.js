"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const bcryptjs_1 = require("bcryptjs");
const index_1 = require("@shared/typeorm/index");
const Aprovado_1 = require("../entity/Aprovado");
class AtualizarSenhaService {
    //not sure if I should use any here...
    //TODO:: later I should return, or a class of user, or an instance of AppError 
    execute({ login, senha, novaSenha }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield index_1.myDataSource
                .getRepository(Aprovado_1.Aprovado)
                .createQueryBuilder("usuario")
                .where("usuario.inscricao = :login", { login })
                .getOne();
            if (!usuario) {
                return new AppError_1.default("Usuario nao encontrado", 401);
            }
            const hashedPassword = yield (0, bcryptjs_1.compare)(senha, usuario.senha);
            if (!hashedPassword) {
                return new AppError_1.default("Combinacao usuario/senha nao confere!", 401);
            }
            //TODO:: Colocar o salt em uma nova constante
            const newPswd = yield (0, bcryptjs_1.hash)(novaSenha, 8);
            yield index_1.myDataSource
                .createQueryBuilder()
                .update(Aprovado_1.Aprovado)
                .set({ senha: newPswd })
                .where("inscricao = :login", { login })
                .execute();
            return { token: `Senha de ${usuario.nome} atualizada com sucesso!` };
        });
    }
}
exports.default = AtualizarSenhaService;
