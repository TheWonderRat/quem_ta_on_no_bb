import { TipoCodigoErro, TipoMensagemErro } from '../../tipos/http/erros';

export default abstract class AppError{
  public readonly mensagem: TipoMensagemErro;
  public readonly codigo: TipoCodigoErro;

  constructor(
    mensagem: TipoMensagemErro,
    codigo: TipoCodigoErro 
  ){
    this.mensagem = mensagem;
    this.codigo = codigo 
  }
}
