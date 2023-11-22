// libraries
import { Router } from 'express';

// class imports
import AbstractRouter from '../../classes/router.class';

// middlewares
import { UserMid } from '../../middlewares/exporter';

// Controller
import { UserController } from '../../modules/controller/exporter';

export default class UserRouter extends AbstractRouter<UserController> {
  constructor() {
    super(Router(), new UserController());
    this.initRoutes();
  }

  // private methods
  protected initRoutes(): void {
    this.router.post(
      this.rootPath,
      UserMid.validateFormat,
      UserMid.validateUserFields,
      this.controller.registerUsers,
    );
  }
}

// // create user
// userRouter.post(
//   '/criar-sessao',
//   celebrate({
//     [Segments.BODY]: {
//       // insert server side validation(1 uppercase, 1 number, and so on
//       login: Joi.number().required(),
//       senha: Joi.string().required(),
//     },
//   }),
//   AprovadoController.criarSessao,
// );

// userRouter.post(
//   '/ativar-conta',
//   celebrate({
//     [Segments.BODY]: {
//       // insert server side validation(1 uppercase, 1 number, and so on
//       login: Joi.number().required(),
//       senha: Joi.string().required(),
//       novaSenha: Joi.string().required(),
//     },
//   }),
//   AuthMid.hasToken,
//   AuthMid.hasValidToken,
//   AprovadoController.ativarConta,
// );

// userRouter.post(
//   '/atualizar-senha',
//   // isAuthenticated,
//   celebrate({
//     [Segments.BODY]: {
//       // insert server side validation(1 uppercase, 1 number, and so on
//       login: Joi.number().required(),
//       senha: Joi.string().required(),
//       novaSenha: Joi.string().required(),
//     },
//   }),
//   AuthMid.hasToken,
//   AuthMid.hasValidToken,
//   AprovadoController.atualizarSenha,
// );

// userRouter.post(
//   '/atualizar-listas',
//   // isAuthenticated,
//   celebrate({
//     [Segments.BODY]: {
//       // insert server side validation(1 uppercase, 1 number, and so on
//       login: Joi.number().required(),
//       senha: Joi.string().required(),
//     },
//   }),
//   AuthMid.hasToken,
//   AuthMid.hasValidToken,
//   AprovadoController.atualizarListas,
// );
