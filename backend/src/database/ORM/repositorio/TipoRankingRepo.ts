  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { TipoRanking } from '../modelo/exporter'

 class TipoRankingRepo extends Repository<TipoRanking> {
  public async cadastrarTipoRanking(numeroTurma: string): Promise<void>{
    const turma = this.criarTipoRanking(numeroTurma);
    await this.manager.save(turma);
  }

  public criarTipoRanking(numeroTurma: string): TipoRanking{
    const tipoRanking= dataSource.manager.create(TipoRanking);

    tipoRanking.nome = numeroTurma;

    return tipoRanking;
  }
}
 export default new TipoRankingRepo(TipoRanking, dataSource.manager);
