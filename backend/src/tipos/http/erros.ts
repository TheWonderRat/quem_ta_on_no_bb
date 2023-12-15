
import { mensagemErroHTTP, codigoErroHTTP } from "../../SSOT/exporter";

export type TipoCodigoErro = 
  codigoErroHTTP.ErroGenerico     
  | codigoErroHTTP.ErroBD           
  | codigoErroHTTP.ErroAutorizacao 
  | codigoErroHTTP.ErroDeAtivacao  
  | codigoErroHTTP.ErroAutenticacao;

export type TipoMensagemErro = 
  | mensagemErroHTTP.ErroGenerico 
  | mensagemErroHTTP.ErroBD  
  | mensagemErroHTTP.ErroAutorizacao 
  | mensagemErroHTTP.ErroAutenticacao
  | mensagemErroHTTP.ErroDeAtivacao ;
  

