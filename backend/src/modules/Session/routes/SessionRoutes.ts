import AbstractRouter from "src/shared/router/AbstractRouter";
import { Router } from "express";
import SessionController from "../controller/SessionController";
 import { celebrate, Joi, Segments } from 'celebrate';




export default class SessionRouter extends AbstractRouter<Router, SessionController>{
  constructor(){
    //TODO: Incluir nome do arquivo de contantes
    super("session",Router(),new SessionController())

  }

  protected initRoutes(): void {
     this.createLoginRoute() 
  }

  
  protected createLoginRoute(): void{
    this.router.post(
      //TODO:: Incluir o nome da rota no arquivo de constantes
   '/criar-sessao',
   celebrate({
     [Segments.BODY]: {
       login: Joi.number().required(),
       senha: Joi.string().required(),
     },
   }),
    this.controller.autenticar
  )
  }

}
