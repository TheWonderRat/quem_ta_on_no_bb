import ErroDeAutorizacao from './ErroDeAutorizacao';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';

export default class UsuarioNaoExiste extends ErroDeAutorizacao{
  constructor(){
    const message = mensagemErroHTTP.ErroAutorizacao.UsuarioNaoEncontrado;
    const code = codigoErroHTTP.ErroAutorizacao.UsuarioNaoEncontrado;
    super(message, code);
  }
}
