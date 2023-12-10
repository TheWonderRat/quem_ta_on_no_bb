import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import ListController from "../controller/ListController";

const listRouter = Router();
const listController = new ListController();

    listRouter.get(
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
    listController.listar,
   );   

export default listRouter;
