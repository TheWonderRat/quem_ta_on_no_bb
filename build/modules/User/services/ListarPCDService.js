"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserEntity_1 = require("../entity/UserEntity");
const index_1 = require("../../../shared/typeorm/index");
class ListarPCDService {
    //not sure if I should use any here...
    //TODO:: later I should return, or a class of user, or an instance of AppError 
    //TODO:: filter the user info that can be shown(exclude password, for exampl)
    async execute({ candidatos, pagina }) {
        const aprovados = await index_1.myDataSource
            .getRepository(UserEntity_1.User)
            .createQueryBuilder("usuario")
            .select()
            .where("usuario.posicaoPCD IS NOT NULL")
            //.skip(candidatos)
            //.take(candidatos * pagina)
            .skip(candidatos * pagina)
            .take(candidatos)
            .orderBy("usuario.posicaoPCD", "ASC")
            .execute();
        //return user
        return { aprovados, message: "listas PCD chamado com sucesso" };
    }
}
exports.default = ListarPCDService;
