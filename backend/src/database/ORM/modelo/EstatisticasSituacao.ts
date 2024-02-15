
//  objeto que armazena as estatisticas de uma certa lista
//  substituir por uma conexao com o redis no futuro
//  as estatisticas estao separadas por lita ppp, uan e UCF
export default class EstatisticasSituacao{
  public readonly emPreparacao: number;
  public readonly convocacaoAutorizada: number;
  public readonly convocacaoExpedida: number;
  public readonly emQualificacao: number;
  public readonly qualificado: number;

  public readonly empossado: number;
  public readonly desistente: number;
  public readonly canceladoPorPrazo: number;
  public readonly inapto: number;
  public readonly naoConvocado: number;

  constructor( 
  emPreparacao: number,
  convocacaoAutorizada: number,
  convocacaoExpedida: number,
  emQualificacao: number,
  qualificado: number,
  empossado: number,
  desistente: number,
  canceladoPorPrazo: number,
  inapto: number,
  naoConvocado: number,
  ){

    this.emPreparacao = emPreparacao;
    this.convocacaoAutorizada = convocacaoAutorizada;
    this.convocacaoExpedida = convocacaoExpedida;
    this.emQualificacao = emQualificacao;
    this.qualificado = qualificado;
    this.empossado = empossado;
    this.desistente = desistente;
    this.canceladoPorPrazo = canceladoPorPrazo;
    this.inapto = inapto;
    this.naoConvocado = naoConvocado;
  }  
}
