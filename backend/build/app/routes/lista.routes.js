"use strict";
// // libraries
// import { Router } from 'express';
// import { celebrate, Joi, Segments } from 'celebrate';
// // middlewares
// import { AuthMid } from '../middlewares/exporter';
// // controllers
// import ListarController from '../modules/controller/ListarController';
// const listarRouter = Router();
// listarRouter.get(
//   '/:candidatos?/:pagina?/:lista?/:cidade?/:diretoria?/:turma?',
//   celebrate({
//     [Segments.QUERY]: {
//       candidatos: Joi.number().required(),
//       pagina: Joi.string().required(),
//       lista: Joi.string().required(),
//       cidade: Joi.string(),
//       diretoria: Joi.string(),
//       turma: Joi.number(),
//       situacao: Joi.string(),
//     },
//   }),
//   AuthMid.hasToken,
//   AuthMid.hasValidToken,
//   ListarController.listar,
// );
// export default listarRouter;
