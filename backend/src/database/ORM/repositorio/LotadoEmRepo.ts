  //libraries
 import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { Aprovado, LotadoEm, Ranking } from '../modelo/exporter'
//relacionamentos
import { atributos, entidades, relacionamentos } from '../../../SSOT/base_de_dados/exporter';

 class LotadoEmRepo extends Repository<LotadoEm> {
  public async cadastrarRanking(
    diretoria: string,
    inscricao: number,
    cidade: string,
    estado: string
  ): Promise<void>{
    const lotadoEm = this.criarLotadoEm(diretoria, inscricao, cidade, estado);
    await this.manager.save(lotadoEm);
  }

  public criarLotadoEm(
    diretoria: string,
    inscricao: number,
    cidade: string,
    estado: string
  ): LotadoEm{
    const lotadoEm = dataSource.manager.create(LotadoEm);

      lotadoEm.inscricao = inscricao;
      lotadoEm.diretoria = diretoria;
      lotadoEm.cidade = cidade;
      lotadoEm.estado = estado;


    return lotadoEm;
  }
}
 export default new LotadoEmRepo(LotadoEm, dataSource.manager);
