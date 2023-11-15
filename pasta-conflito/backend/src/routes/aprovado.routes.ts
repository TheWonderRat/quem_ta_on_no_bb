// libraries
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

// middlewares
import { AuthMid } from '../middlewares/exporter';

// controllers
import AprovadoController from '../modules/controller/AprovadoController';

const userRouter = Router();
const usersController = new AprovadoController();

// create user
userRouter.post(
  '/criar-sessao',
  celebrate({
    [Segments.BODY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      login: Joi.number().required(),
      senha: Joi.string().required(),
    },
  }),
  usersController.criarSessao,
);

userRouter.post(
  '/ativar-conta',
  celebrate({
    [Segments.BODY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      login: Joi.number().required(),
      senha: Joi.string().required(),
      novaSenha: Joi.string().required(),
    },
  }),
  AuthMid.hasToken,
  AuthMid.hasValidToken,
  usersController.ativarConta,
);

userRouter.post(
  '/atualizar-senha',
  // isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      login: Joi.number().required(),
      senha: Joi.string().required(),
      novaSenha: Joi.string().required(),
    },
  }),
  AuthMid.hasToken,
  AuthMid.hasValidToken,
  usersController.atualizarSenha,
);

userRouter.post(
  '/atualizar-listas',
  // isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      login: Joi.number().required(),
      senha: Joi.string().required(),
    },
  }),
  AuthMid.hasToken,
  AuthMid.hasValidToken,
  usersController.atualizarListas,
);

export default userRouter;
