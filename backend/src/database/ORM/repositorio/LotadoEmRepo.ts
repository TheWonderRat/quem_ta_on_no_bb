  //libraries
import { Repository } from 'typeorm';

  //ORM
import dataSource from '../../config';
  //entity
import { LotadoEm } from '../modelo/exporter'

 class LotadoEmRepo extends Repository<LotadoEm> {

  public async buscarPorPosicaoAmpla(posicao: number): Promise<LotadoEm | null>{
      const lotadoEm = await this.findOne({ where: { posicao } });

      return lotadoEm; 
  }


  public async cadastrarLotadoEm(
    diretoria: string,
    posicaoAmpla: number,
    cidade: string,
    estado: string
  ): Promise<void>{
    const lotadoEm = this.criarLotadoEm(diretoria, posicaoAmpla, cidade, estado);
    await this.manager.save(lotadoEm);
  }

  public criarLotadoEm(
    diretoria: string,
    posicaoAmpla: number,
    cidade: string,
    estado: string
  ): LotadoEm{
    const lotadoEm = dataSource.manager.create(LotadoEm);

      lotadoEm.posicao= posicaoAmpla;
      lotadoEm.diretoria = diretoria;
      lotadoEm.cidade = cidade;
      lotadoEm.estado = estado;


    return lotadoEm;
  }
  // WARNING:: ficou estrano concertar depois

}
 export default new LotadoEmRepo(LotadoEm, dataSource.manager);
