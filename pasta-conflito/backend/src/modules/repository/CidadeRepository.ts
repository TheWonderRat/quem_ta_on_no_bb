// libraries
import { Repository } from 'typeorm';

// ORM
import { myDataSource } from '../../database/typeorm';

// entity
import { Cidade } from '../entity/Cidade';

class CidadeRepository extends Repository<Cidade> {}

export default new CidadeRepository(Cidade, myDataSource.manager);
