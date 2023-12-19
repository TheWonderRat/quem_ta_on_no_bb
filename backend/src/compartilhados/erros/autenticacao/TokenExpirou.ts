import { ErroDeAutenticacao } from './ErroDeAutenticacao';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';

export default class SenhaIncompativel extends ErroDeAutenticacao{

  constructor(){
    const message = mensagemErroHTTP.ErroAutenticacao.TokenExpirou ;
    const code = codigoErroHTTP.ErroAutenticacao.TokenExpirou;

    super(message, code);
  }
}
