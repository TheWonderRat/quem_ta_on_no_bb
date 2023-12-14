import { mensagemErroHTTP, codigoErroHTTP } from "../../../SSOT/exporter";
import ErroDaBaseDeDados from "./ErroDesconhecido";


export default abstract class ErroDeConexao extends ErroDaBaseDeDados{ 
  constructor(){
    const message = mensagemErroHTTP.ErroGenerico.ErroNoServidor;
    const codigo = codigoErroHTTP.ErroGenerico.ErroNoServidor;
    super(message, codigo);
  }
}
