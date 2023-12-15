import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import {  RequisicaoParaAtualizarSenha, RespostaParaAtualizarSenha} from "../../../tipos/servicos/usuario";



export default class ServicoParaAtualizarSenha extends ServicoAbstrato<RequisicaoParaAtualizarSenha,RespostaParaAtualizarSenha>{

  public async executar(parameters: RequisicaoParaAtualizarSenha): Promise<RespostaParaAtualizarSenha>{
    return { email: "called on update password service" }
      
  }
}
