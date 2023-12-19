import { Request, Response } from 'express';
import ServicoParaCriarSessao from '../servicos/ServicoParaCriarSessao';

export default class ControladorDeSessao{

  public async criarSessao(request: Request, response: Response){

    const sessionService = new ServicoParaCriarSessao();
    const { login, senha } = request.body;
    const result = await sessionService.executar({ login: Number(login), senha});
    return response.json(result);
  }
}
