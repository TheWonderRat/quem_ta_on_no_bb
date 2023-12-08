// libraries
import { Request, Response, NextFunction as Next } from 'express';

// Abstract Controller
import AbstractController from '../../classes/controller.class';

// types
import { requestTypes as RT } from '../../types/exporter';

// SSOT
import { httpStatus } from '../../SSOT/exporter';

// Helpers
import { UserHelper } from '../../shared/helpers/exporter';

// Service
import { UserService } from '../service/exporter';

export default class AprovadoController extends AbstractController<UserService> {
  constructor() {
    super(new UserService());
    this.registerUsers = this.registerUsers.bind(this);
  }

  public async registerUsers(req: Request, res:Response, next: Next): Promise<Response | void> {
    try {
      const usersWithHash: RT.NewUserRecord[] = await UserHelper
        .createHashedPassword(req.body);

      const newUsers: RT.NewUserId[] = await this.service.createUsers(usersWithHash);

      return res.status(httpStatus.CREATED).send(newUsers);
    } catch (error) { return next(error); }
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
