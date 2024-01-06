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

import {
  RequisicaoAtualizarTodos,
  RespostaAtualizarTodos,
  RequisicaoAtualizarEmMudanca,
  RespostaAtualizarEmMudanca,
} from './atualizacao'

export type ServiceRequestTypes =
  RequisicaoParaListarORanking
  | RequisicaoParaAtualizarSenha
  | RequisicaoParaAtivarConta
  | RequisicaoParaDesativarConta
  | RequisicaoParaCriarSessao
  | RequisicaoAtualizarEmMudanca
  | RequisicaoAtualizarTodos;

export type ServiceResponseTypes =
  RespostaParaListarORanking
  | RespostaParaAtualizarSenha
  | RespostaParaAtivarConta
  | RespostaParaDesativarConta
  | RespostaParaCriarSessao
  | RespostaAtualizarEmMudanca
  | RespostaAtualizarTodos;
