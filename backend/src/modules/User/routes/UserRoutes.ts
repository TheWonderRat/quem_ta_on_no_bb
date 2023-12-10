
 import { Router } from 'express';
 import { celebrate, Joi, Segments } from 'celebrate';

// // middlewares
//import { AuthMid } from '../middlewares/exporter';

// // controllers
import UserController from '../controller/UserController';

 const userRouter = Router();
 const userController = new UserController();

  
     //rota para atualizacao de conta
     userRouter.post(
       //TODO: inserir constante
       '/atualizar-senha',
        //isAuthenticated,
       celebrate({
         [Segments.BODY]: {
           login: Joi.number().required(),
           senha: Joi.string().required(),
           novaSenha: Joi.string().required(),
         },
       }),
      userController.updatePassword
     );

     //rota para atualizacao de conta
     userRouter.post(
       //TODO: inserir constante
       '/ativar-conta',
        //isAuthenticated,
       celebrate({
         [Segments.BODY]: {
           login: Joi.number().required(),
           senha: Joi.string().required(),
           novaSenha: Joi.string().required(),
         },
       }),
      userController.activateAccount
     );

     //rota para atualizacao de conta
     userRouter.delete(
       //TODO: inserir constante
       '/desativar-conta',
        //isAuthenticated,
       celebrate({
         [Segments.BODY]: {
           login: Joi.number().required(),
           senha: Joi.string().required(),
           novaSenha: Joi.string().required(),
         },
       }),
      userController.deactivateAccount
     );

 export default userRouter;

