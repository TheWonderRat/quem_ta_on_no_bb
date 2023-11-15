// libraries
import { Repository } from 'typeorm';

// ORM
import myDataSource from '../../database/typeorm';

// entity
import { Turma } from '../entity/Turma';

class TurmaRepository extends Repository<Turma> {}

export default new TurmaRepository(Turma, myDataSource.manager);
