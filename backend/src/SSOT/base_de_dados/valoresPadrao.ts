export enum Situacao {
  FilaDeEspera = 'fila_de_espera',
  EmPreparacao = 'em_preparacao',
  ConvocacaoAutorizada = 'convocacao_autorizada',
  ConvocacaoExpedida ='convocacao_expedida',
  EmQualificacao = 'em_qualificacao',
  Qualificado = 'qualificado',
  Empossado = 'empossado',
  Desistente = 'desistente',
  CanceladoPorPrazo = 'cancelado_por_prazo',
  Inapto = 'inapto_outros_motivos',
  NaoConvocado = 'nao_convocado',
};

//  Evita o erro de o exporter nao encontrar a importacao
export enum Diretorias{
  DITEC = 'DITEC',
  UAN = 'UAN',
  UCF = 'UCF',
}
