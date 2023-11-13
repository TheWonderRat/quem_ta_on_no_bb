import { Router, Request, Response } from 'express'
import {celebrate, Joi, Segments} from 'celebrate'
import ListarController from '../controllers/ListarController'
import { isAuthenticated } from '@shared/middlewares/authMiddlewares'

const listarRouter = Router()
const listarController = new ListarController();


listarRouter.get(
	'/:candidatos?/:pagina?/:lista?/:cidade?/:diretoria?/:turma?',
  celebrate({
		[Segments.QUERY] : {
			candidatos:Joi.number().required(),
			pagina:Joi.string().required(),
      lista: Joi.string().required(),
      cidade: Joi.string(),
      diretoria: Joi.string(),
      turma: Joi.number(),
      situacao: Joi.string()
		},
	}),
  isAuthenticated,
	listarController.listar
)


export default listarRouter;
