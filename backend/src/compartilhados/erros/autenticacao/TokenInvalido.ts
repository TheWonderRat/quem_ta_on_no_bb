import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';
import { ErroDeAutenticacao } from './ErroDeAutenticacao';

export default class TokenInvalido extends ErroDeAutenticacao{

  constructor(){
    const message = mensagemErroHTTP.ErroAutenticacao.TokenInvalido;
    const codigo = codigoErroHTTP.ErroAutenticacao.TokenInvalido;
    super(message, codigo);
  }
}
