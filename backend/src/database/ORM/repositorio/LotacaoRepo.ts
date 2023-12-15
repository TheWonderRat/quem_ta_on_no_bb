  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Aprovado, Lotacao, Ranking } from '../modelo/exporter'
//relacionamentos
import { atributos, entidades, relacionamentos } from '../../../SSOT/base_de_dados/exporter';

 class LotacaoRepo extends Repository<Lotacao> {

  public async cadastrarLotacao(diretoria: string, cidade: string, estado: string): Promise<void>{
    const ranking = this.criarLotacao(diretoria,cidade, estado);
    await this.manager.save(ranking);
  }

  public criarLotacao(diretoria: string, cidade: string, estado: string): Lotacao{
    const lotacao = dataSource.manager.create(Lotacao);

      lotacao.diretoria = diretoria;
      lotacao.cidade = cidade;
      lotacao.estado = estado;

    return lotacao;
  }
}
 export default new LotacaoRepo(Lotacao, dataSource.manager);
