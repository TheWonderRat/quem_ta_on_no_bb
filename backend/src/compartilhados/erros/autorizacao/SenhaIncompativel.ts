import ErroDeAutorizacao from './ErroDeAutorizacao';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';

export default class SenhaIncompativel extends ErroDeAutorizacao{
  constructor(){
    const message = mensagemErroHTTP.ErroAutorizacao.SenhaNaoConfere;
    const code = codigoErroHTTP.ErroAutorizacao.SenhaNaoConfere;

    super(message, code);
  }
}
