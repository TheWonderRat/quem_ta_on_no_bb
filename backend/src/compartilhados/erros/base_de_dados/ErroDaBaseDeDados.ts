import { AppError } from './../exporter';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';

export default abstract class ErroDaBaseDeDados extends AppError{
  constructor(mensagem: mensagemErroHTTP.ErroBD, codigo: codigoErroHTTP.ErroBD){
    super(mensagem, codigo);
  }
}
