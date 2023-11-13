import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { isAuthenticated } from 'src/middlewares/authMiddlewares';
import AprovadoController from '../controllers/AprovadoController';

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

// evitar o bug de erros personalizados do express
/*
userRouter.patch(
'/dummy-secret-route/abandoned-route-that-will-be-here-until-i-fix-the-express-bug',
((request: Request, response: Response) =>{
return response.status(500).json({status:"forbidden", message:"this is just a dummy route, until i fix the express bug it will be here!"});
})
);
*/

export default userRouter;
