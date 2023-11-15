import { Request, Response, NextFunction } from 'express';

import AtivarContaService from '../services/AtivarContaService';
import AtualizarSenhaService from '../services/AtualizarSenhaService';
import AtualizarListasService from '../services/AtualizarListasService';
import CriarSessaoService from '../services/CriarSessaoService';

export default class AprovadoController {
  async ativarConta(request: Request, response:Response, nextFunction: NextFunction): Promise<Response> {
    const ativarConta = new AtivarContaService();
    const users = await ativarConta.execute(request.body);

    return response.json(users);
  }

  async criarSessao(request: Request, response:Response, nextFunction: NextFunction): Promise<Response> {
    const criarSessao = new CriarSessaoService();
    const users = await criarSessao.execute(request.body);

    return response.json(users);
  }

  async atualizarSenha(request: Request, response:Response, nextFunction: NextFunction): Promise<Response> {
    const atualizarSenha = new AtualizarSenhaService();
    const users = await atualizarSenha.execute(request.body);

    return response.json(users);
  }

  async atualizarListas(request: Request, response:Response, nextFunction: NextFunction): Promise<Response> {
    const updateUsers = new AtualizarListasService();
    // TODO:: filtrar os parametros aqui
    const users = await updateUsers.execute(request.body);

    return response.json(users);
  }
}
