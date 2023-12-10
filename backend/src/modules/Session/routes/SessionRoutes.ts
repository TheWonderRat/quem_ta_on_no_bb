import { Router } from "express";
import SessionController from "../controller/SessionController";
 import { celebrate, Joi, Segments } from 'celebrate';


const sessionRouter = Router();
const sessionController = new SessionController();


  
    sessionRouter.post(
      //TODO:: Incluir o nome da rota no arquivo de constantes
   '/criar-sessao',
   celebrate({
     [Segments.BODY]: {
       login: Joi.number().required(),
       senha: Joi.string().required(),
     },
   }),
    sessionController.autenticar
  )

export default sessionRouter;
