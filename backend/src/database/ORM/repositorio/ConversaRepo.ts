import { Repository } from 'typeorm';
import { Conversa } from '../modelo/exporter';

  //  ORM
import dataSource from '../../config';

 class ConversaRepo extends Repository<Conversa> {
  public async cadastrarConversa(
      uuidWhatsapp: string,
      iniciadoEm: Date,
      enviadaEm: Date,
      mensagemCliente: string,
      respostaBot: string,
      posicaoAmpla?: number,
  ): Promise<void>{

    const conversa = this.criarSugestao(
      uuidWhatsapp,
        iniciadoEm,
        enviadaEm,
        mensagemCliente,
        respostaBot,
        posicaoAmpla,
    );
    await this.manager.save(conversa);
  }

  public criarSugestao(
      uuidWhatsapp: string,
      iniciadoEm: Date,
      enviadaEm: Date,
      mensagemCliente: string,
      respostaBot: string,
      posicaoAmpla?: number,
    ): Conversa {
      const conversa = this.manager.create(Conversa);
      conversa.posicaoAmpla = posicaoAmpla;
      conversa.uuidWhatsapp = uuidWhatsapp;
      conversa.mensagemCliente = mensagemCliente;
      conversa.respostaBot = respostaBot; 
      conversa.iniciadoEm = iniciadoEm;
      conversa.enviadaEm = enviadaEm;
      return conversa;
  }
}
export default new ConversaRepo(Conversa, dataSource.manager);
