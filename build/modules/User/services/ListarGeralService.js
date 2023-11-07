"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserEntity_1 = require("../entity/UserEntity");
const index_1 = require("../../../shared/typeorm/index");
class ListarGeralService {
    //not sure if I should use any here...
    //TODO:: later I should return, or a class of user, or an instance of AppError 
    //TODO:: filter the user info that can be shown(exclude password, for exampl)
    async execute({ candidatos, pagina }) {
        const aprovados = await index_1.myDataSource
            .getRepository(UserEntity_1.User)
            .createQueryBuilder("usuario")
            .select()
            //.skip(candidatos)
            //.take(candidatos * pagina)
            .skip(candidatos * pagina)
            .take(candidatos)
            .orderBy("usuario.posicaoAmpla", "ASC")
            .execute();
        //adicionar paginacao
        /*
        const aprovados = await myDataSource
          .manager
          .getRepository(User)
          .createQueryBuilder()
          .where("posicaoPPP != null")
          .skip(candidatos * pagina)
          .take(candidatos)
          .execute();
        */
        //const user = await UserModel.find()
        //return user
        return { aprovados, message: "listas PCD chamado com sucesso" };
    }
}
exports.default = ListarGeralService;
