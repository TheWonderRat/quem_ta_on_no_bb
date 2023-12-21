import { Request, Response } from 'express';
import ServicoParaCriarSessao from '../servicos/ServicoParaCriarSessao';
//  import { RespostaParaCriarSessao } from '../../../tipos/servicos/sessao';
//  import { AppError } from '../../../compartilhados/erros/exporter'

export default class ControladorDeSessao {
  //  public async criarSessao(request: Request, response: Response): Promise<RespostaParaCriarSessao | AppError>{
  public async criarSessao(request: Request, response: Response) {
    const sessionService = new ServicoParaCriarSessao();
    const { login, senha } = request.body;
    const result = await sessionService.executar({ login: Number(login), senha });
    return response.json(result);
  }
}
