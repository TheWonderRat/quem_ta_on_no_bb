import { AppError } from './../exporter';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';

export default abstract class ErroDeAutorizacao extends AppError{
  constructor(mensagem: mensagemErroHTTP.ErroAutorizacao, codigo: codigoErroHTTP.ErroAutorizacao){
    super(mensagem, codigo);
  }
}
