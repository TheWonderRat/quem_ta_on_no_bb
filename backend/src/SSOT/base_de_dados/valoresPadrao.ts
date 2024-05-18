export enum Situacao {
  //FilaDeEspera = 'fila_de_espera',
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
export enum Diretorias {
  DITEC = 'DITEC',
  UAN = 'UAN',
  UCF = 'UCF',
}

export enum Cidades{
  Brasilia = 'Brasilia',
  SaoPaulo = 'SaoPaulo'
}

export enum TipoRanking {
  ListaCompleta = 'lista_completa',
  ListaCompletaDiretas = 'lista_completa_diretas',
  ListaCompletaCR = 'lista_completa_cr',

  ListaDeChamada = 'lista_de_chamada',
  ListaDeChamada2 = 'lista_de_chamada_2',
  AmplaCompleta = 'lista_ampla_completa',
  AmplaDiretas = 'lista_ampla_diretas',
  AmplaCR = 'lista_ampla_cr',
  PPPCompleta = 'lista_ppp_completa',
  PPPDiretas = 'lista_ppp_diretas',
  PPPCR = 'lista_ppp_cr',
  PCDCompleta = 'lista_pcd_completa',
  PCDDiretas = 'lista_pcd_diretas',
  PCDCR = 'lista_pcd_cr'
}

export enum Notificacao{
  //  notificacoes sobre as situacoes dos aprovados
  Situacao = 'situacao',
  //  informa as posses de cada diretoria
  Diretoria = 'diretoria'
}

export enum Estatisticas{
  PPP = 'ppp',
  PCD = 'pcd',
  Ampla = 'ampla'
}

export enum ErroDeAtualizacao{
  Puppeteer = 'puppeteer',
}
