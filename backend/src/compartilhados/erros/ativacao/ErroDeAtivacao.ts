import { AppError } from './../exporter';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';


export abstract class ErroDeAtivacao extends AppError{
  constructor(mensagem: mensagemErroHTTP.ErroDeAtivacao, codigo: codigoErroHTTP.ErroDeAtivacao){
    super(mensagem, codigo);
  }
}
