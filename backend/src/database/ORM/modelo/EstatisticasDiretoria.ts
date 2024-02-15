
//  objeto que armazena as estatisticas de uma certa lista
//  substituir por uma conexao com o redis no futuro
//  as estatisticas estao separadas por lita ppp, uan e UCF
export default class EstatisticasDiretoria{
  public readonly nome: string;
  public readonly ppp: number;
  public readonly pcd: number;
  public readonly ampla: number;
  public readonly todos: number;

  constructor( nome: string, ppp: number, pcd: number, ampla: number ){
    this.nome = nome;
    this.ppp = ppp;
    this.pcd = pcd;
    this.ampla= ampla;
    this.todos = ppp + pcd + ampla;
  }  
}
