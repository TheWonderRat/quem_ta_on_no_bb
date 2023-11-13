// Types
import { Request, Response } from 'express';

import AtivarContaService from '../services/AtivarContaService';
import AtualizarSenhaService from '../services/AtualizarSenhaService';
import AtualizarListasService from '../services/AtualizarListasService';
import CriarSessaoService from '../services/CriarSessaoService';
import ListarGeralService from '../services/ListarGeralService';
import ListarConvocacoes from '../services/ListarConvocacoes';
import ListarPCDService from '../services/ListarPCDService';
import ListarPPPService from '../services/ListarPPPService';
import ListarTresParaUmService from '../services/ListarTresParaUmService';
import ListarQuatroParaUmService from '../services/ListarQuatroParaUmService';

export default class UserController {
  // Instância de todas as classes de serviço necessárias.
  private readonly ativarContaService = new AtivarContaService();
  private readonly atualizarSenhaService = new AtualizarSenhaService();
  private readonly criarSessaoService = new CriarSessaoService();
  private readonly listarGeralService = new ListarGeralService();
  private readonly listarPppService = new ListarPPPService();
  private readonly listarPcdService = new ListarPCDService();
  private readonly listarTresParaUmService = new ListarTresParaUmService();
  private readonly listarQuatroPraUmService = new ListarQuatroParaUmService();
  private readonly listarConvocacoesService = new ListarConvocacoes();
  private readonly updateUsersService = new AtualizarListasService();

  // Métodos públicos que serão chamados pelas rotas.
  public async ativarConta(request: Request, response: Response): Promise<Response> {
    const users = await this.ativarContaService.execute(request.body);

    return response.json(users);
  }

  public async criarSessao(request: Request, response:Response): Promise<Response> {
    const users = await this.criarSessaoService.execute(request.body);

    return response.json(users);
  }

  public async atualizarSenha(request: Request, response:Response): Promise<Response> {
    const users = await this.atualizarSenhaService.execute(request.body);

    return response.json(users);
  }

  public async listarGeral(request: Request, response:Response): Promise<Response> {
    const { candidatos, pagina } = request.query;
    // o celebrate garante que sempre serao numeros
    const users = await this.listarGeralService
      .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });

    return response.json(users);
  }

  public async listarPPP(request: Request, response:Response): Promise<Response> {
    // TODO:: filtrar os parâmetros aqui
    const { candidatos, pagina } = request.query;
    // o celebrate garante que sempre serão números
    const users = await this.listarPppService
      .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });

    return response.json(users);
  }

  public async listarPCD(request: Request, response:Response): Promise<Response> {
    // TODO:: filtrar os parametros aqui
    const { candidatos, pagina } = request.query;

    const users = await this.listarPcdService
      .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });

    return response.json(users);
  }

  public async listarTresParaUm(request: Request, response:Response): Promise<Response> {
    // TODO:: filtrar os parametros aqui
    const { candidatos, pagina } = request.query;
    // possivel por conta da validacao do express
    const users = await this.listarTresParaUmService
      .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });

    return response.json(users);
  }

  public async listarQuatroParaUm(request: Request, response:Response): Promise<Response> {
    // TODO:: filtrar os parametros aqui
    const { candidatos, pagina } = request.query;
    // possivel por conta da validacao do express
    const users = await this.listarQuatroPraUmService
      .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });

    return response.json(users);
  }

  public async listarConvocacoes(request: Request, response:Response): Promise<Response> {
    // TODO:: filtrar os parametros aqui
    const { candidatos, pagina } = request.query;
    // possivel por conta da validacao do express
    const users = await this.listarConvocacoesService
      .execute({ candidatos: Number(candidatos), pagina: Number(pagina) });

    return response.json(users);
  }

  public async atualizarListas(request: Request, response:Response): Promise<Response> {
    // TODO:: filtrar os parametros aqui
    const users = await this.updateUsersService.execute(request.body);

    return response.json(users);
  }
}
