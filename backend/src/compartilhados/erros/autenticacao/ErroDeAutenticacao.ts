import { AppError } from './../exporter';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';


export abstract class ErroDeAutenticacao extends AppError{
  constructor(mensagem: mensagemErroHTTP.ErroAutenticacao, codigo: codigoErroHTTP.ErroAutenticacao){
    super(mensagem, codigo);
  }
}
