import { mensagemErroHTTP, codigoErroHTTP } from '../../../SSOT/exporter';
import ErroDaBaseDeDados from './ErroDaBaseDeDados';


export default abstract class ErroDeConexao extends ErroDaBaseDeDados{ 
  constructor(){
    const message = mensagemErroHTTP.ErroBD.ConexaoNaoEncontrada;
    const codigo = codigoErroHTTP.ErroBD.ConexaoNaoEncontrada;
    super(message, codigo);
  }
}
