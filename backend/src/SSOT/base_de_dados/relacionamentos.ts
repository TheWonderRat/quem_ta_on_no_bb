//relacionamentos devem ter exatamente os mesmos nomes das variaveis das entidades, ou teremos um erro
export enum Aprovado{
  LotadoEm = 'lotadoEm',
  SituacaoVinculada = 'situacaoVinculada',
  TurmaVinculada = 'turmaVinculada',
  RankingsDoAprovado = 'rankingsDoAprovado',
  ContatoDoAprovado = 'contadoDoAprovado' 
}

export enum Contato{
  UsuarioVinculado = 'usuarioVinculado'
}

export enum Cidade{
  LotacoesVinculadas = 'lotacoesVinculadas',
  EstadoVinculado = 'estadoVinculado'
}

export enum Diretoria{
  LotacoesVinculadas = 'lotacoesVinculadas',

}

export enum Estado{
  CidadesVinculadas = 'cidadesVinculadas',
}

export enum Lotacao{
  AprovadosNaLotacao = 'aprovadosNaLotacao',
  CidadeVinculada = 'cidadeVinculada',
  DiretoriaVinculada = 'diretoriaVinculada'
}

export enum LotadoEm{
  AprovadoVinculado = 'aprovadoVinculado',
  LotacaoVinculada = 'lotacaoVinculada'
}

export enum Ranking{
  AprovadoVinculado = 'aprovadoVinculado',
  TipoVinculado = 'tipoVinculado'
}

export enum Situacao{
  AprovadosNaSituacao = 'aprovadosNaSituacao',
}

export enum TipoRanking{
  RankingsVinculados = 'rankingsVinculados'
}

export enum Turma{
  AprovadosDaTurma = 'aprovadosDaTurma'
}

