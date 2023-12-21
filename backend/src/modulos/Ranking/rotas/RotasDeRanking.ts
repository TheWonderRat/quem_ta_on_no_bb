import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ControladorDoRanking from '../controlador/ControladorDoRanking';
import { GerenciadorDeAutenticacao } from '../../../compartilhados/utilitarios/exporter';

const rotasDeRanking = Router();
const controladorDoRanking = new ControladorDoRanking();

//  como as constantes devem ser validads logo em seguida e devem ter exatamente o mesmo nome,
//  optei por nao usar constantes nesse caso
rotasDeRanking.get(
  '/:aprovados?/:pagina?/:lista?/:cidade?/:diretoria?/:turma?',
  GerenciadorDeAutenticacao.verificarAutenticacao,
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
  controladorDoRanking.listarRanking,
);

export default rotasDeRanking;
