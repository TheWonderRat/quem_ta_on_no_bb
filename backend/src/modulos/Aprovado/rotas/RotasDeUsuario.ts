import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

// controllers
import UserController from '../controlador/ControladorDeUsuario';
import { GerenciadorDeAutenticacao } from '../../../compartilhados/utilitarios/exporter';

//nomes das rotas
import { caminhos } from '../../../SSOT/exporter';

const rotasDeUsuario = Router();
const controladorDeUsuario = new UserController();

//rota para atualizacao de conta
rotasDeUsuario.post(
// TODO: inserir constante
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
  caminhos.Aprovado.AtivarConta,// TODO: inserir constante
  celebrate({
    [Segments.BODY]: {
      login: Joi.number().required(),
      senha: Joi.string().required(),
    },
  }),
  controladorDeUsuario.ativarConta
);

// rota para atualizacao de conta
rotasDeUsuario.delete(
// TODO: inserir constante
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
