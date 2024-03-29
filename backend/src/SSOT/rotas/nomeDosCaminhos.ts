export const raiz: string = '/';
export const usuario: string = '/usuario';
export const ranking: string = '/ranking';
export const sessao: string = '/sessao';
export const atualizacao: string = '/atualizacao';
export const mensagem: string = '/mensagem'

export enum Raiz{
  Raiz = '/',
};

export enum Aprovado{
  //Raiz = '/usuario',
  AtualizarSenha = '/atualizar-senha',
  AtivarConta = '/ativar-conta',
  DesativarConta = '/desativar-conta',
};

export enum Ranking{
  //Raiz = '/ranking',
};

export enum Sessao{
  Raiz = '/sessao',
  CriarSessao = '/criar-sessao',
};

export enum Atualizacao{
  EmMudanca = '/em-mudanca',
  Todos = '/todos',
  PorPosicaoAmpla = '/por-posicao',
  PorSituacoes = '/por-situacoes',
}

export enum Mensagem{
  Interagir = '/interagir',
}
