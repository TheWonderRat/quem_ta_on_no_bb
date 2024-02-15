import { Request, Response } from 'express';
import GerenciadorDeMensagens from '../../../compartilhados/utilitarios/GerenciadorDeMensagens';


export default class ControladorDeMensagens{

  public async enviarMensagem(request: Request, response: Response){
    const { clientUUID,mensagem } = request.body;
    //  e possivel usar o cast de inscricao por conta da validacao do celebrate
    const resp = await GerenciadorDeMensagens.receberMensagem(clientUUID, mensagem);
    return response.json({resp})
  }
}
