// libraries
import { Repository } from 'typeorm';

// ORM
import { myDataSource } from '../../database/typeorm';

// entity
import { TipoLista } from '../entity/TipoLista';

class TipoListaRepository extends Repository<TipoLista> {}

export default new TipoListaRepository(TipoLista, myDataSource.manager);
