import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { caminhos } from '../../../SSOT/exporter';
import ControladorDeAtualizacao from '../controlador/ControladorDeAtualizacao';

const rotasDeAtualizacao = Router();
const controladorDeAtualizacao = new ControladorDeAtualizacao();

rotasDeAtualizacao.post(
  caminhos.Atualizacao.EmMudanca,
//  WARNING:: Descomentar essa linha quando colocar em producao
//  GerenciadorDeAutenticacao.verificarAutenticacao,
  celebrate({
    [Segments.BODY]: {
      captcha: Joi.string().required(),
      userAgent: Joi.string(),
    },
  }),
  controladorDeAtualizacao.atualizarEmMudanca,
);

rotasDeAtualizacao.post(
  caminhos.Atualizacao.Todos,
  //  WARNING:: Descomentar essa linha quando colocar em producao
  //  GerenciadorDeAutenticacao.verificarAutenticacao,
  celebrate({
    [Segments.BODY]: {
      captcha: Joi.string().required(),
      userAgent: Joi.string(),
    },
  }),
  controladorDeAtualizacao.atualizarTodos
);

export default rotasDeAtualizacao;
