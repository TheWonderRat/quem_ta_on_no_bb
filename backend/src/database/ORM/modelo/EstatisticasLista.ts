
//  objeto que armazena as estatisticas de uma certa lista
//  substituir por uma conexao com o redis no futuro
//  as estatisticas estao separadas por lita ppp, uan e UCF
export default class Estatisticas{
  public readonly nome: string;
  public readonly DITEC: number;
  public readonly UAN: number;
  public readonly UCF: number;
  public readonly todos: number;

  constructor( nome: string, DITEC: number, UAN: number, UCF: number ){
    this.nome = nome;
    this.DITEC = DITEC;
    this.UAN = UAN;
    this.UCF = UCF;
    this.todos = DITEC + UAN + UCF;
  }  
}

//export default new Estatisticas();
