import { myDataSource } from "@shared/typeorm"
import { TipoLista } from "../entity/TipoLista"
import TipoListaDBConstants from "../constants/TipoListaDBConstants";
import { Repository } from 'typeorm'


class TipoListaRepository extends Repository<TipoLista>{
}

export const TipoListasRepo = new TipoListaRepository(TipoLista,myDataSource.manager);
