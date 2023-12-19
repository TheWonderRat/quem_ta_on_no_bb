import { ErroDeAtivacao } from './ErroDeAtivacao';
import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';

export default class ContaEstaAtiva extends ErroDeAtivacao{

  constructor(){
    const message = mensagemErroHTTP.ErroDeAtivacao.ContaEstaAtiva;
    const code = codigoErroHTTP.ErroDeAtivacao.ContaEstaAtiva;
    super(message, code)
  }
}
