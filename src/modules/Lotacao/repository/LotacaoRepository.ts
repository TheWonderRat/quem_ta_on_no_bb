import { myDataSource } from "@shared/typeorm"
import { Repository } from "typeorm";
import { Lotacao } from "../entity/Lotacao";


class LotacaoRepository extends Repository<Lotacao>{
}

export const LotacaosRepo = new LotacaoRepository(Lotacao,myDataSource.manager);
