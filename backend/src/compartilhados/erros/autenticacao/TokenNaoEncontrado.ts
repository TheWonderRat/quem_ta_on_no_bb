import ErroDeAutorizacao from "./ErroDeAutorizacao";
import { mensagemErroHTTP, codigoErroHTTP } from "../../../SSOT/exporter";

export default class SenhaIncompativel extends ErroDeAutorizacao{

  constructor(){
    const message = mensagemErroHTTP.ErroAutenticacao.TokenNaoEncontrado;
    const codigo = codigoErroHTTP.ErroAutenticacao.TokenNaoEncontrado;
    super(message, codigo)
  }
}
