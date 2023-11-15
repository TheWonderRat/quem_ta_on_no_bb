// o nome das chaves primarias deve ser o mesmo da constante,
// a propriedade name nao funciona em chaves primarias
export default {
  // atibutos----------------------
  NomeEntidade: 'aprovados',
  Inscricao: 'inscricao',
  Situacao: 'situacao',
  Turma: 'turma',
  Lotacao: 'lotacao',
  Nome: 'nome',
  Senha: 'senha',
  DataQuestionario: 'data_questionario',
  DataQualificacao: 'data_qualificacao',
  DataPosse: 'data_posse',
  PPP: 'ppp',
  PCD: 'pcd',
  CriadoEm: 'criado_em',
  AtualizadoEm: 'atualizado_em',
  // relacoes--------------------
  // deve ser o nome da variavel declarada na entidade, nao o nome da relacao
  AprovadosNasListas: 'aprovadoNasListas',
  LotadoEm: 'lotadoEm',
  EstaNaSituacao: 'estaNaSituacao',
  EstaNaTurma: 'estaNaTurma',
};
