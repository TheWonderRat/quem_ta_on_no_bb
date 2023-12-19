import { ErroDeAutenticacao } from './ErroDeAutenticacao';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';

export default class SenhaIncompativel extends ErroDeAutenticacao{

  constructor(){
    const message = mensagemErroHTTP.ErroAutenticacao.TokenNaoEncontrado;
    const codigo = codigoErroHTTP.ErroAutenticacao.TokenNaoEncontrado;
    super(message, codigo);
  }
}
