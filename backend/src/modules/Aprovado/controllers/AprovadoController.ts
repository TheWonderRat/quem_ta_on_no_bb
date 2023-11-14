import { Request, Response } from 'express';

import AtivarContaService from '../services/AtivarContaService';
import AtualizarSenhaService from '../services/AtualizarSenhaService';
import AtualizarListasService from '../services/AtualizarListasService';
import CriarSessaoService from '../services/CriarSessaoService';

export default class AprovadoController {
  private readonly ativarContaService = new AtivarContaService();
  private readonly criarSessaoService = new CriarSessaoService();
  private readonly atualizarSenhaService = new AtualizarSenhaService();
  private readonly updateUsersService = new AtualizarListasService();

  async ativarConta(request: Request, response:Response): Promise<Response> {
    const users = await this.ativarContaService.execute(request.body);

    return response.json(users);
  }

  async criarSessao(request: Request, response:Response): Promise<Response> {
    const users = await this.criarSessaoService.execute(request.body);

    return response.json(users);
  }

  async atualizarSenha(request: Request, response:Response): Promise<Response> {
    const users = await this.atualizarSenhaService.execute(request.body);

    return response.json(users);
  }

  async atualizarListas(request: Request, response:Response): Promise<Response> {
    // TODO:: filtrar os parametros aqui
    const users = await this.updateUsersService.execute(request.body);

    return response.json(users);
  }
}
