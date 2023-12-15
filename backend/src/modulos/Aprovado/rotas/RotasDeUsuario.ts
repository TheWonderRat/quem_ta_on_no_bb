
 import { Router } from 'express';
 import { celebrate, Joi, Segments } from 'celebrate';

// // middlewares
//import { AuthMid } from '../middlewares/exporter';

// // controllers
import UserController from '../controlador/ControladorDeUsuario';

 const rotasDeUsuario = Router();
 const controladorDeUsuario = new UserController();

  
     //rota para atualizacao de conta
     rotasDeUsuario.post(
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
      controladorDeUsuario.atualizarSenha
     );

     //rota para atualizacao de conta
     rotasDeUsuario.post(
       //TODO: inserir constante
       '/ativar-conta',
        //isAuthenticated,
       celebrate({
         [Segments.BODY]: {
           inscricao: Joi.number().required(),
           senha: Joi.string().required(),
         },
       }),
      controladorDeUsuario.ativarConta
     );

     //rota para atualizacao de conta
     rotasDeUsuario.delete(
       //TODO: inserir constante
       '/desativar-conta',
        //isAuthenticated,
       celebrate({
         [Segments.BODY]: {
           login: Joi.number().required(),
           senha: Joi.string().required(),
         },
       }),
      controladorDeUsuario.desativarConta
     );

 export default rotasDeUsuario;

