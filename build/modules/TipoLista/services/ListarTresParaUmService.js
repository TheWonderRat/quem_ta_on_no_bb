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
Object.defineProperty(exports, "__esModule", { value: true });
const Aprovado_1 = require("../entity/Aprovado");
const index_1 = require("@shared/typeorm/index");
class ListarTresParaUmService {
    //not sure if I should use any here...
    //TODO:: later I should return, or a class of user, or an instance of AppError 
    //TODO:: filter the user info that can be shown(exclude password, for example)
    execute({ candidatos, pagina }) {
        return __awaiter(this, void 0, void 0, function* () {
            const aprovados = yield index_1.myDataSource
                .getRepository(Aprovado_1.Aprovado)
                .createQueryBuilder("usuario")
                .select()
                .skip(candidatos * pagina)
                .take(candidatos)
                .orderBy("usuario.posicaoAmpla", "ASC")
                .execute();
            //TODO:: Create view aggregating PCD results 
            /*
          const aprovadosAmpla = await myDataSource
              .getRepository(User)
              .createQueryBuilder("usuario")
              .select()
              .skip(candidatos * pagina)
              .take(candidatos)
              .orderBy("usuario.posicaoAmpla","ASC")
              .execute();
            */
            //adicionar paginacao
            return { aprovados, message: "Nao implementato ainda, os resultados sao os da ampla!!" };
        });
    }
}
exports.default = ListarTresParaUmService;
