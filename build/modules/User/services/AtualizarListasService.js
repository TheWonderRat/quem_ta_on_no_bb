"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const bcryptjs_1 = require("bcryptjs");
//import { UserRepository } from '../entity/UserRepository'
const UserEntity_1 = require("../entity/UserEntity");
const index_1 = __importDefault(require("../../../shared/typeorm/index"));
class AtualizarListasService {
    //not sure if I should use any here...
    //TODO:: later I should return, or a class of user, or an instance of AppError 
    async execute({ login, senha }) {
        const usuario = await index_1.myDataSource
            .manager
            .getRepository(UserEntity_1.User)
            .createQueryBuilder()
            .where("user.inscricao = :login", { login })
            .getOne();
        if (!usuario) {
            return new AppError_1.default("Usuario nao foi encontrado!", 401);
        }
        const hashedPswd = await (0, bcryptjs_1.compare)(senha, usuario.senha);
        if (!hashedPswd) {
            return new AppError_1.default("Combicanao usuario/senha nao confere!", 401);
        }
        //TODO:: sobrescrever os tipos do typescript para suportar o retorno do token
        /*
        const token = await sign(
                {
                    usuario: usuario.inscricao,
                },
                authConfig.jwt.secret,
                {
                    subject: user.inscricao,
                    expiresIn:authConfig.jwt.expiresIn,
                },
            )
        */
        //.andWhere("user.senha = :login",{ login })
        //const user = new UserModel({name:name,email:email,weirdProperty:'loool'})
        //const user = UserModel.create({name:name,email:email,weirdProperty:'loool'})
        /*
            const user = await UserModel.findOne({'email':email})
    
            if(!user){
                return new AppError("Incorrect email/password combination",401)
            }
    
            const hashedPswd = await compare(password,user.password)
    
            if(!hashedPswd){
                return new AppError("Incorrect email/password combination",401)
            }
    
            //Eyjafjallajökull Eyjafjallajökull
            //8a1b7dbde4482b5cfbc62310166bdedfff834dbe894e75e4f1d4fdb4d553e0a4736eb28b9deb9390c9a71217d52f0fdb41f00c64a521082d09684ba939f38cb6
    
            //TODO:: Export to config
        /*
            const token = await sign(
                {
                    userId: user._id.toString(),
                    allowedFiles:[]
                },
                authConfig.jwt.secret,
                {
                    subject: user._id.toString(),
                    expiresIn:authConfig.jwt.expiresIn,
                },
            );
        */
        //TODO::Filter user password and available files for user return
        //return {token, user};
        return { token: "Atualizar Listas chamado com sucesso" };
    }
}
exports.default = AtualizarListasService;
