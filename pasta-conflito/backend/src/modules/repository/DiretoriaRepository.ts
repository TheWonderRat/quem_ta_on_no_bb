// libraries
import { Repository } from 'typeorm';

// ORM
import myDataSource from '../../database/typeorm';

// entity
import { Diretoria } from '../entity/Diretoria';

class DiretoriaRepository extends Repository<Diretoria> {}

export default new DiretoriaRepository(Diretoria, myDataSource.manager);
