import { PostgresDataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { TipoLista } from '../entity/TipoLista';
import TipoListaDBConstants from '../constants/TipoListaDBConstants';

class TipoListaRepository extends Repository<TipoLista> {
}

export const TipoListasRepo = new TipoListaRepository(TipoLista, PostgresDataSource.manager);
