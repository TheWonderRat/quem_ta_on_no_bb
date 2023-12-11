
import { Request, Response } from 'express'
import ServicoParaCriarSessao from '../servicos/ServicoParaCriarSessao'

export default class ControladorDeSessao{

  public async criarSessao(request: Request, response: Response){

    const sessionService = new ServicoParaCriarSessao()
    const {email} = request.params;
    const result = await sessionService.executar({email});
    return response.json(result)
  }
}
