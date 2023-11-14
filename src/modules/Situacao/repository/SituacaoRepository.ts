import { myDataSource } from "@shared/typeorm"
import { Repository } from 'typeorm'
import { Situacao } from "../entity/Situacao";


class SituacaoRepository extends Repository<Situacao>{
  
}

  //TODO:: testar o que acontece se o usuario nao for encontrado

export const SituacaosRepo = new SituacaoRepository(Situacao,myDataSource.manager);
