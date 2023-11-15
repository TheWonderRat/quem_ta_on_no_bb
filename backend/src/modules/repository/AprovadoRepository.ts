// libraries
import { Repository } from 'typeorm';

// ORM
import myDataSource from '../../database/typeorm';

// entity
import { Aprovado } from '../entity/exporter';

// SSOT
import AprovadosDBConstants from '../../SSOT/AprovadosDBConstants';

class AprovadoRepository extends Repository<Aprovado> {
  public async findByLogin(login: number): Promise<Aprovado | null> {
    return myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder(`${AprovadosDBConstants.nomeEntidade}`)
      .where(`${AprovadosDBConstants.inscricao} = :login`, { login })
      .getOne();
  }

  // TODO:: testar o que acontece se o usuario nao for encontrado
  public async updatePassword(login: number, novaSenha: string): Promise<void> {
    await myDataSource
      .createQueryBuilder(Aprovado, 'apr')
      .update()
      .set({ senha: novaSenha })
      .where(`${AprovadosDBConstants.nomeEntidade}.
        ${AprovadosDBConstants.inscricao}= :login`, { login })
      .execute();
  }
}

export default new AprovadoRepository(Aprovado, myDataSource.manager);
