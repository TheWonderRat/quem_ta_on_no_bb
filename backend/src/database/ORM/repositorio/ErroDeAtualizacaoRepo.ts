  //  libraries
  import { ErroDeAtualizacao } from '../modelo/exporter';
import { Repository } from 'typeorm';

  //  ORM
import dataSource from '../../config';
  //  entity
import { Cidade } from '../modelo/exporter'

 class ErroDeAtualizacaoRepo extends Repository<ErroDeAtualizacao> {

  public async cadastrarErroDeAtualizacao(
      log: string, 
      tipo: string,
      posicaoAmpla: number,
    ): Promise<void>{

    const erro = this.criarErroDeAtualizacao(log,tipo,posicaoAmpla);
    await this.manager.save(erro);
  }

  public criarErroDeAtualizacao(
      log: string, 
      tipo: string,
      posicaoAmpla: number,
    ): ErroDeAtualizacao{
      const erro = this.manager.create(ErroDeAtualizacao);
      erro.log = log;
      erro.tipo = tipo;
      erro.posicaoDoAprovadoNaAmpla = posicaoAmpla;

    return erro;
  }
}
export default new ErroDeAtualizacaoRepo(ErroDeAtualizacao, dataSource.manager);
