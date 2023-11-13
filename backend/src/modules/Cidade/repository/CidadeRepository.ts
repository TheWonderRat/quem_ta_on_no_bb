import { PostgresDataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from '../entity/Cidade';

class CidadeRepository extends Repository<Cidade> {

}

export const CidadeRepo = new CidadeRepository(Cidade, PostgresDataSource.manager);
