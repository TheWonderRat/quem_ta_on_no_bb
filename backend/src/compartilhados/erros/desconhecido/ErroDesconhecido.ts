import { AppError } from "./../exporter";
import { mensagemErroHTTP, codigoErroHTTP } from "../../../SSOT/exporter";

export default abstract class ErroDesconhecido extends AppError {
  constructor(mensagem: mensagemErroHTTP.ErroGenerico , codigo: codigoErroHTTP.ErroGenerico){
    super(mensagem, codigo)
  }
}
