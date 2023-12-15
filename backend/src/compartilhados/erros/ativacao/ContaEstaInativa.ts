import { ErroDeAtivacao } from "./ErroDeAtivacao";
import { mensagemErroHTTP, codigoErroHTTP } from "../../../SSOT/exporter";

export default class ContaEstaInativa extends ErroDeAtivacao{

  constructor(){
    const message = mensagemErroHTTP.ErroDeAtivacao.ContaEstaInativa;
    const code = codigoErroHTTP.ErroDeAtivacao.ContaEstaInativa


    super(message, code)
  }
}
