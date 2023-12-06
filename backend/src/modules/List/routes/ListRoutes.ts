import AbstractRouter from "src/shared/router/AbstractRouter";
import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import ListController from "../controller/ListController";


export default class ListRouter extends AbstractRouter<Router, ListController>{
  constructor(){
    //TODO:: criar nome de rota no SSOT
    super("listar", Router(),new ListController());

  }

  protected initRoutes(): void{
    this.createListRoute();
  }

  protected createListRoute(): void {
    this.router.get(
     '/:candidatos?/:pagina?/:lista?/:cidade?/:diretoria?/:turma?',
     celebrate({
       [Segments.QUERY]: {
         candidatos: Joi.number().required(),
         pagina: Joi.string().required(),
         lista: Joi.string().required(),
         cidade: Joi.string(),
         diretoria: Joi.string(),
         turma: Joi.number(),
         situacao: Joi.string(),
       },
     }),
      //is autenticated aqui,
      this.controller.listar,
   );   
  }
}

