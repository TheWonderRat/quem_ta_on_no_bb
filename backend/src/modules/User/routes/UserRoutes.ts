
 import { Router } from 'express';
 import { celebrate, Joi, Segments } from 'celebrate';

// // middlewares
//import { AuthMid } from '../middlewares/exporter';

// // controllers
import UserController from '../controller/UserController';
 import AbstractRouter from 'src/shared/router/AbstractRouter';


export default class UserRouter extends AbstractRouter<Router, UserController>{
  constructor(){
     //TODO::inserir nome da rota no arquivo de constantes
    super("user", Router(), new UserController())
   }

  protected initRoutes(): void {
     this.createUpdatePasswordRoute();
  } 
  
   protected createUpdatePasswordRoute(): void{
     //rota para atualizacao de conta
     this.router.post(
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
      this.controller.updatePassword
     );
   }

  protected activateAccountRoute(): void{
     //rota para atualizacao de conta
     this.router.post(
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
      this.controller.activateAccount
     );
   }

  protected deactivateAccountRoute(): void{
     //rota para atualizacao de conta
     this.router.delete(
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
      this.controller.deactivateAccount
     );
   }
}


