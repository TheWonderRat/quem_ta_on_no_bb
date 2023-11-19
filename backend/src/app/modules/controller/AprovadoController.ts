// // libraries
// import { Request, Response } from 'express';

// // Service
// import {
//   AtivarContaService,
//   AtualizarSenhaService,
//   AtualizarListasService,
//   CriarSessaoService,
// } from '../service/exporter';

// export default class AprovadoController {
//   public static async ativarConta(request: Request, response:Response): Promise<Response> {
//     const users = await AtivarContaService.execute(request.body);
//     return response.json(users);
//   }

//   public static async criarSessao(request: Request, response:Response): Promise<Response> {
//     const users = await CriarSessaoService.execute(request.body);
//     return response.json(users);
//   }

//   public static async atualizarSenha(request: Request, response:Response): Promise<Response> {
//     const users = await AtualizarSenhaService.execute(request.body);
//     return response.json(users);
//   }

//   public static async atualizarListas(request: Request, response:Response): Promise<Response> {
//     // TODO:: filtrar os parametros aqui
//     const users = await AtualizarListasService.execute(request.body);
//     return response.json(users);
//   }
// }
