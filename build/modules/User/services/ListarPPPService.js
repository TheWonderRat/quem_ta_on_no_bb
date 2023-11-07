"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../shared/typeorm/index");
const UserEntity_1 = require("../entity/UserEntity");
class ListarPPPService {
    //not sure if I should use any here...
    //TODO:: later I should return, or a class of user, or an instance of AppError 
    //TODO:: filter the user info that can be shown(exclude password, for exampl)
    async execute({ candidatos, pagina }) {
        const aprovados = await index_1.myDataSource
            .getRepository(UserEntity_1.User)
            .createQueryBuilder("usuario")
            .select()
            .where("usuario.posicaoPPP IS NOT NULL")
            //.skip(candidatos)
            .skip(candidatos * pagina)
            .take(candidatos)
            .orderBy("usuario.posicaoPPP", "ASC")
            //.take(candidatos)
            .execute();
        //TODO:: adicionar autenticacao
        //adicionar paginacao
        /*
        const aprovados = await myDataSource
          .manager
          .getRepository(User)
          .createQueryBuilder()
          .where("posicaoPPP  != null")
          .skip(candidatos * pagina)
          .take(candidatos)
          .execute();
        */
        //const user = await UserModel.find()
        //return user
        return { aprovados, message: "listas PPP chamado com sucesso" };
    }
}
exports.default = ListarPPPService;
