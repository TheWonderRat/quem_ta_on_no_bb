import { myDataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { Aprovado } from '../entity/Aprovado';
import AprovadosDBConstants from '../constants/AprovadosDBConstants';

class AprovadoRepository extends Repository<Aprovado> {
  public async findByLogin(login: number): Promise<Aprovado | null> {
    return await myDataSource
      .getRepository(Aprovado)
      .createQueryBuilder(`${AprovadosDBConstants.NomeEntidade}`)
      .where(`${AprovadosDBConstants.Inscricao} = :login`, { login })
      .getOne();
  }

  // TODO:: testar o que acontece se o usuario nao for encontrado
  public async updatePassword(login: number, novaSenha: string): Promise<void> {
    await myDataSource
      .createQueryBuilder(Aprovado, 'apr')
      .update()
      .set({ senha: novaSenha })
      .where(`${AprovadosDBConstants.NomeEntidade}.${AprovadosDBConstants.Inscricao}= :login`, { login })
      .execute();
  }
}

export const AprovadosRepo = new AprovadoRepository(Aprovado, myDataSource.manager);
