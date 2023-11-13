import { Repository } from 'typeorm';
import { myDataSource } from '../../../shared/typeorm';
import { Turma } from '../entity/Turma';

class TurmaRepository extends Repository<Turma> {

}

export const TurmasRepo = new TurmaRepository(Turma, myDataSource.manager);
