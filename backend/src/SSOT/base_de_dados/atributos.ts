//constantes dos atributos das entidades
export enum Cidade{
  Nome = 'nome',
  Estado = 'estado',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum Contato{
  PosicaoAmpla = 'posicao',
  UUIDWhatsapp= 'celular',
  Email = 'email',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum Diretoria{
  Nome = 'nome',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum Estado{
  Nome = 'nome',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum Lotacao{
  Cidade = 'cidade',
  Estado = 'estado',
  Diretoria = 'diretoria',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum LotadoEm{
  PosicaoAmpla = 'posicao',
  Cidade = 'cidade_vinculada',
  Estado = 'estado_vinculado',
  Diretoria = 'diretoria_vinculada',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum Ranking{
  PosicaoAmpla = 'posicao',
  TipoRanking = 'tipo',
  Posicao = 'posicao_no_ranking',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum TipoRanking{
  Nome = 'tipo',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum Situacao{
  Nome = 'nome_situacao',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum Turma{
  Numero = 'numero_turma',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'
};

export enum ErroAtualizacao{
  PosicaoDoAprovado = 'posicao_do_aprovado',
  Tipo = 'tipo',
  Log = 'log',
}

export enum Aprovado{
  PosicaoAmpla = 'posicao',
  Inscricao = 'inscricao',
  Nome = 'nome',
  Senha = 'senha_aprovado',
  Situacao = 'situacao',
  DataPosse = 'data_posse',
  PPP = 'ppp',
  PCD = 'pcd',
  Turma = 'turma',
  Ativo = 'ativo',
  CriadoEm = 'criado_em',
  AtualizadoEm = 'atualizado_em'

};


export enum Notificacao{
  PosicaoDoAprovado = 'posicao',
  Tipo = 'tipo_de_notificacao',
  Ativado = 'ativado',
}

export enum TipoNotificacao{
  Tipo = 'tipo',
  Descricao = 'descricao'
}
