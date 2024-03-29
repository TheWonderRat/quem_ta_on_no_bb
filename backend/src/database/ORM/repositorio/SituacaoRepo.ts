  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Aprovado, Ranking, Situacao } from '../modelo/exporter'

 class SituacaoRepo extends Repository<Situacao> {
  public async cadastrarSituacao(nomeSituacao: string): Promise<void>{
    const ranking = this.criarSituacao(nomeSituacao);
    await this.manager.save(ranking);
  }

  public criarSituacao(nomeSituacao: string): Situacao{
    const situacao = dataSource.manager.create(Situacao);
    situacao.nome = nomeSituacao;

    return situacao;
  }

    public async buscarPorNome(nome: string): Promise<Situacao | null>{
      return await this.findOneBy({ nome });
    }
}
 export default new SituacaoRepo(Situacao, dataSource.manager);
