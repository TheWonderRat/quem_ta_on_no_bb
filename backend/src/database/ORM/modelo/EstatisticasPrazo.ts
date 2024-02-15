
//  objeto que armazena as estatisticas de uma certa lista
//  substituir por uma conexao com o redis no futuro
//  as estatisticas estao separadas por lita ppp, uan e UCF
export default class EstatisticasPrazo{
  public readonly nome: string;
  public data: Date;

  constructor( nome: string, data: Date){
    this.nome = nome;
    this.data = data;
  }  
}
