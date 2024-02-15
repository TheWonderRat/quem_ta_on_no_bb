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

rotasDeAtualizacao.post(
  caminhos.Atualizacao.PorPosicaoAmpla,
  //  WARNING:: Descomentar essa linha quando colocar em producao
  //  GerenciadorDeAutenticacao.verificarAutenticacao,
  celebrate({
    [Segments.BODY]: {
      captcha: Joi.string().required(),
      aprovados: Joi.array().required(),
      userAgent: Joi.string()
    },
  }),
  controladorDeAtualizacao.atualizarPorPosicaoAmpla
);

rotasDeAtualizacao.post(
  caminhos.Atualizacao.PorSituacoes ,
  //  WARNING:: Descomentar essa linha quando colocar em producao
  //  GerenciadorDeAutenticacao.verificarAutenticacao,
  celebrate({
    [Segments.BODY]: {
      captcha: Joi.string().required(),
      situacoes: Joi.array().required(),
      userAgent: Joi.string()
    },
  }),
  controladorDeAtualizacao.atualizarPorPosicaoAmpla
);

export default rotasDeAtualizacao;
