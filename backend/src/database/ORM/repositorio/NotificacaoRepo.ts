  //  libraries
 import { Repository } from 'typeorm';

  //  ORM
import dataSource from '../../config';
  //  entity
import { Notificacao } from '../modelo/exporter'

 class NotificacaoRepo extends Repository<Notificacao> {
  public async cadastrarCidade(posicao: number, tipo: number): Promise<void>{

    const cidade = this.criarNotificacao(posicao, tipo);
    await this.manager.save(cidade);
  }

  public criarNotificacao(posicao: number,tipo: number): Notificacao{
      const notificacao = this.manager.create(Notificacao);
      notificacao.posicaoDoAprovado = posicao
      notificacao.tipo =  tipo

    return notificacao;
  }
}
export default new NotificacaoRepo(Notificacao, dataSource.manager);
