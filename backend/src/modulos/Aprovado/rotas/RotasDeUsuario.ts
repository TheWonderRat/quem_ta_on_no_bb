
 import { Router } from 'express';
 import { celebrate, Joi, Segments } from 'celebrate';
// // middlewares
//import { AuthMid } from '../middlewares/exporter';

// // controllers
import UserController from '../controlador/ControladorDeUsuario';
import { GerenciadorDeAutenticacao } from '../../../compartilhados/utilitarios/exporter';

 const rotasDeUsuario = Router();
 const controladorDeUsuario = new UserController();
 import {caminhos} from '../../../SSOT/exporter'


   //rota para atualizacao de conta
   rotasDeUsuario.post(
     //TODO: inserir constante
    caminhos.Aprovado.AtualizarSenha,
    GerenciadorDeAutenticacao.verificarAutenticacao,
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
    caminhos.Aprovado.AtivarConta,
    celebrate({
       [Segments.BODY]: {
         login: Joi.number().required(),
         senha: Joi.string().required(),
       },
     }),
    controladorDeUsuario.ativarConta
   );

   //rota para atualizacao de conta
   rotasDeUsuario.delete(
     //TODO: inserir constante
    caminhos.Aprovado.DesativarConta ,
    GerenciadorDeAutenticacao.verificarAutenticacao,
    celebrate({
       [Segments.BODY]: {
         login: Joi.number().required(),
         senha: Joi.string().required(),
       },
     }),
    controladorDeUsuario.desativarConta
   );

 export default rotasDeUsuario;

