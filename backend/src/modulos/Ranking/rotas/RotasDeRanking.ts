import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import { ControladorDoRanking } from "../controlador/ControladorDoRanking";
//import { parametrosDeRota as pr} from "../../../SSOT/exporter";

const rotasDeRanking = Router();
const controladorDoRanking = new ControladorDoRanking();

    //como as constantes devem ser validads logo em seguida e devem ter exatamente o mesmo nome,
    //optei por nao usar constantes nesse caso
    rotasDeRanking.get(
     //`/:${pr.Ranking.Candidatos}?/:${pr.Ranking.Pagina}?/:${pr.Ranking.Lista}?/:${pr.Ranking.Cidade}?/:${pr.Ranking.Diretoria}?/:${pr.Ranking.Turma}?`,
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
