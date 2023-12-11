
export default abstract class ErroDoApp{
  public readonly mensagem: string;
  public readonly codigo: number;

  constructor(
    mensagem: string,
    codigo: number 
  ){
    this.mensagem = mensagem;
    this.codigo = codigo 
  }
}
