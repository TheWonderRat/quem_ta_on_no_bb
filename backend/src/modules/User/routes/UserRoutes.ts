
 import { Router } from 'express';
 import { celebrate, Joi, Segments } from 'celebrate';

// // middlewares
//import { AuthMid } from '../middlewares/exporter';

// // controllers
import UserController from '../controller/UserController';

const controller = new UserController();

 const userRouter = Router();

 //rota para ativacao de conta
 userRouter.post(
   '/ativar-conta',
   celebrate({
     [Segments.BODY]: {
       login: Joi.number().required(),
       senha: Joi.string().required(),
       novaSenha: Joi.string().required(),
     },
   }),
   //UserController.ativarConta,
 );

 //rota para atualizacao de conta
 userRouter.post(
   '/atualizar-senha',
    //isAuthenticated,
   celebrate({
     [Segments.BODY]: {
       login: Joi.number().required(),
       senha: Joi.string().required(),
       novaSenha: Joi.string().required(),
     },
   }),
 );

 export default userRouter;
