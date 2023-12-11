import { 
  RequisicaoParaListarORanking,RespostaParaListarORanking 
} from "./ranking";

import { 
  RequisicaoParaCriarSessao, RespostaParaCriarSessao 
} from "./sessao";

import { 
  RequisicaoParaAtivarConta, RespostaParaAtivarConta,
  RequisicaoParaDesativarConta, RespostaParaDesativarConta,
  RequisicaoParaAtualizarSenha, RespostaParaAtualizarSenha
} from "./usuario";

export type ServiceRequestTypes = 
//list request types
  RequisicaoParaListarORanking | 
//user request types
  RequisicaoParaAtualizarSenha | RequisicaoParaAtivarConta | RequisicaoParaDesativarConta |
//session request types
  RequisicaoParaCriarSessao;

export type ServiceResponseTypes = 
//list response types
  RespostaParaListarORanking |
//user response types
  RespostaParaAtualizarSenha | RespostaParaAtivarConta | RespostaParaDesativarConta | 
//session response types
  RespostaParaCriarSessao;
