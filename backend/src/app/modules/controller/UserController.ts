// libraries
import { Request, Response } from 'express';

// types
import { userTypes } from '../../types/exporter';

// SSOT
import { httpStatus } from '../../SSOT/exporter';

// Abstract Controller
import AbstractController from '../../classes/controller.class';

// Service
import { UserService } from '../service/exporter';

export default class AprovadoController extends AbstractController<UserService> {
  constructor() {
    super(new UserService());
    this.registerUser = this.registerUser.bind(this);
  }

  public async registerUser(request: Request, response:Response): Promise<Response> {
    const newUser: userTypes.UserSavedId = await this.service.createUser(request.body);
    return response.status(httpStatus.CREATED).send(newUser);
  }

  // public static async ativarConta(request: Request, response:Response): Promise<Response> {
  //   const users = await AtivarContaService.execute(request.body);
  //   return response.json(users);
  // }

  // public static async criarSessao(request: Request, response:Response): Promise<Response> {
  //   const users = await CriarSessaoService.execute(request.body);
  //   return response.json(users);
  // }

  // public static async atualizarSenha(request: Request, response:Response): Promise<Response> {
  //   const users = await AtualizarSenhaService.execute(request.body);
  //   return response.json(users);
  // }

  // public static async atualizarListas(request: Request, response:Response): Promise<Response> {
  //   // TODO:: filtrar os parametros aqui
  //   const users = await AtualizarListasService.execute(request.body);
  //   return response.json(users);
  // }
}
