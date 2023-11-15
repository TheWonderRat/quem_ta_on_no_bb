const nomeEntidade = 'aprovados';
const inscricao = 'inscricao';
const situacao = 'situacao';
const turma = 'turma';
const lotacao = 'lotacao';
const nome = 'nome';
const senha = 'senha';
const dataQuestionario = 'data_questionario';
const dataQualificacao = 'data_qualificacao';
const dataPosse = 'data_posse';
const ppp = 'ppp';
const pcd = 'pcd';
const criadoEm = 'criado_em';
const atualizadoEm = 'atualizado_em';
const aprovadosNasListas = 'aprovadoNasListas';
const lotadoEm = 'lotadoEm';
const estaNaSituacao = 'estaNaSituacao';
const estaNaTurma = 'estaNaTurma';

// o nome das chaves primarias deve ser o mesmo da constante,
// a propriedade name nao funciona em chaves primarias
export default {
  // atibutos----------------------
  ppp,
  pcd,
  nome,
  senha,
  turma,
  lotacao,
  criadoEm,
  situacao,
  dataPosse,
  inscricao,
  atualizadoEm,
  nomeEntidade,
  dataQuestionario,
  dataQualificacao,
  // relacoes--------------------
  // deve ser o nome da variavel declarada na entidade, nao o nome da relacao
  lotadoEm,
  estaNaTurma,
  estaNaSituacao,
  aprovadosNasListas,
};
