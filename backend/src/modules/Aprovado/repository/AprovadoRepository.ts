import { myDataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { Aprovado } from '../entity/Aprovado';
import AprovadosDBConstants from '../constants/AprovadosDBConstants';

class AprovadoRepository extends Repository<Aprovado> {
  public async findByLogin(login: number): Promise<Aprovado | null> {
    return myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder(`${AprovadosDBConstants.NomeEntidade}`)
      .where(`${AprovadosDBConstants.Inscricao} = :login`, { login })
      .getOne();
  }

  // TODO:: testar o que acontece se o usuario nao for encontrado
  public async updatePassword(login: number, novaSenha: string): Promise<void> {
    return myDataSource
      .createQueryBuilder()
      .update(Aprovado)
      .set({ senha: novaSenha })
      .where(`apr.${AprovadosDBConstants.Inscricao}= :login`, { login })
      .execute();
  }
}

export default new AprovadoRepository(Aprovado, myDataSource.manager);
