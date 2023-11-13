import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../shared/typeorm';
import { Turma } from '../entity/Turma';

class TurmaRepository extends Repository<Turma> {

}

export const TurmasRepo = new TurmaRepository(Turma, PostgresDataSource.manager);
