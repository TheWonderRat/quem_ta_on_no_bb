import { Router, Request, Response } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { isAuthenticated } from '@shared/middlewares/authMiddlewares';
import UsersController from '../controllers/UsersController';

const userRouter = Router();
const usersController = new UsersController();

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
  // isAuthenticated,
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
  // isAuthenticated,
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
  isAuthenticated,
  usersController.atualizarListas,
);

// get user info [REQUIRES AUTH MIDDLEWARE]
userRouter.get(
  '/listar-todos',
  celebrate({
    [Segments.QUERY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      candidatos: Joi.number().required(),
      pagina: Joi.number().required(),
    },
  }),
  isAuthenticated,
  usersController.listarGeral,
);

// get user info [REQUIRES AUTH MIDDLEWARE and PASSWORD]
userRouter.get(
  '/listar-ppp/:candidatos?/:pagina?',
  celebrate({
    [Segments.QUERY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      candidatos: Joi.number().required(),
      pagina: Joi.number().required(),
    },
  }),
  isAuthenticated,
  usersController.listarPPP,
);

userRouter.get(
  '/listar-pcd/:candidatos?/:pagina?',
  celebrate({
    [Segments.QUERY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      candidatos: Joi.number().required(),
      pagina: Joi.number().required(),
    },
  }),
  isAuthenticated,
  usersController.listarPCD,
);

userRouter.get(
  '/listar-tres/:candidatos?/:pagina?',
  celebrate({
    [Segments.QUERY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      candidatos: Joi.number().required(),
      pagina: Joi.number().required(),
    },
  }),
  isAuthenticated,
  usersController.listarTresParaUm,
);

userRouter.get(
  '/listar-quatro/:candidatos?/:pagina?',
  celebrate({
    [Segments.QUERY]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      candidatos: Joi.number().required(),
      pagina: Joi.number().required(),
    },
  }),
  isAuthenticated,
  usersController.listarQuatroParaUm,
);

userRouter.get(
  '/listar-convocacao/:candidatos?/:pagina?',
  celebrate({
    [Segments.PARAMS]: {
      // insert server side validation(1 uppercase, 1 number, and so on
      candidatos: Joi.number().required(),
      pagina: Joi.number().required(),
    },
  }),
  isAuthenticated,
  usersController.listarConvocacoes,
);

// evitar o bug de erros personalizados do express
userRouter.patch(
  '/dummy-secret-route/abandoned-route-that-will-be-here-until-i-fix-the-express-bug',
  ((request: Request, response: Response) => response.status(500).json({ status: 'forbidden', message: 'this is just a dummy route, until i fix the express bug it will be here!' })),
);

export default userRouter;
