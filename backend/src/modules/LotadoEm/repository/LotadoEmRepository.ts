import { PostgresDataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { LotadoEm } from '../entity/LotadoEm';
import LotadoEmsDBConstants from '../constants/LotadoEmDBConstants';

class LotadoEmRepository extends Repository<LotadoEm> {

}

export const LotadoEmRepo = new LotadoEmRepository(LotadoEm, PostgresDataSource.manager);
