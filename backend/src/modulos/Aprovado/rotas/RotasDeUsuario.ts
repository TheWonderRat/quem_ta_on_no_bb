
 import { Router } from 'express';
 import { celebrate, Joi, Segments } from 'celebrate';
// // middlewares
//import { AuthMid } from '../middlewares/exporter';

// // controllers
import UserController from '../controlador/ControladorDeUsuario';
 import { estaAutenticado } from '../../../funcoes/middlewares/middlewareAutenticar';

 const rotasDeUsuario = Router();
 const controladorDeUsuario = new UserController();
 import {caminhos} from '../../../SSOT/exporter'

  
     //rota para atualizacao de conta
     rotasDeUsuario.post(
       //TODO: inserir constante
      caminhos.Aprovado.AtualizarSenha,
       celebrate({
         [Segments.BODY]: {
           login: Joi.number().required(),
           senha: Joi.string().required(),
           novaSenha: Joi.string().required(),
         },
       }),
      estaAutenticado,
      controladorDeUsuario.atualizarSenha
     );

     //rota para atualizacao de conta
     rotasDeUsuario.post(
       //TODO: inserir constante
      caminhos.Aprovado.AtivarConta ,
      celebrate({
         [Segments.BODY]: {
           login: Joi.number().required(),
           senha: Joi.string().required(),
         },
       }),
      estaAutenticado,
      controladorDeUsuario.ativarConta
     );

     //rota para atualizacao de conta
     rotasDeUsuario.delete(
       //TODO: inserir constante
      caminhos.Aprovado.DesativarConta ,
      estaAutenticado,
       celebrate({
         [Segments.BODY]: {
           login: Joi.number().required(),
           senha: Joi.string().required(),
         },
       }),
      estaAutenticado,
      controladorDeUsuario.desativarConta
     );

 export default rotasDeUsuario;

