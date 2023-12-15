import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import { ControladorDoRanking } from "../controlador/ControladorDoRanking";

const rotasDeRanking = Router();
const controladorDoRanking = new ControladorDoRanking();

    rotasDeRanking.get(
     '/:candidatos?/:pagina?/:lista?/:cidade?/:diretoria?/:turma?',
     celebrate({
       [Segments.QUERY]: {
         aprovados: Joi.number().required(),
         pagina: Joi.string().required(),
         lista: Joi.string().required(),
         cidade: Joi.string(),
         diretoria: Joi.string(),
         turma: Joi.number(),
         situacao: Joi.string(),
       },
     }),
      //is autenticated aqui,
    controladorDoRanking.listarRanking,
   );   

export default rotasDeRanking;
