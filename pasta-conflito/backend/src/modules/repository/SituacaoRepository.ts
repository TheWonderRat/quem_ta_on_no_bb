// libraries
import { Repository } from 'typeorm';

// ORM
import myDataSource from '../../database/typeorm';

// entity
import { Situacao } from '../entity/exporter';

class SituacaoRepository extends Repository<Situacao> {}

// TODO:: testar o que acontece se o usuario nao for encontrado
export default new SituacaoRepository(Situacao, myDataSource.manager);
