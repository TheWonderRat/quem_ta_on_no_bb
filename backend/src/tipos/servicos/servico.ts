import {
  RequisicaoParaListarORanking,
  RespostaParaListarORanking,
} from './ranking';

import {
  RequisicaoParaCriarSessao,
  RespostaParaCriarSessao,
} from './sessao';

import {
  RequisicaoParaAtivarConta,
  RespostaParaAtivarConta,
  RequisicaoParaDesativarConta,
  RespostaParaDesativarConta,
  RequisicaoParaAtualizarSenha,
  RespostaParaAtualizarSenha,
} from './aprovado';

export type ServiceRequestTypes =
  RequisicaoParaListarORanking
  | RequisicaoParaAtualizarSenha
  | RequisicaoParaAtivarConta
  | RequisicaoParaDesativarConta
  | RequisicaoParaCriarSessao;
export type ServiceResponseTypes =
  RespostaParaListarORanking
  | RespostaParaAtualizarSenha
  | RespostaParaAtivarConta
  | RespostaParaDesativarConta
  | RespostaParaCriarSessao;
