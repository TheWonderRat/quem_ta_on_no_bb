import AbstractService from "../../../compartilhados/servico/ServicoAbstrato";
import { RequisicaoParaCriarSessao, RespostaParaCriarSessao} from "../../../tipos/servicos/sessao";

export default class ServicoParaCriarSessao extends AbstractService<RequisicaoParaCriarSessao,RespostaParaCriarSessao>{

  public async executar(parameters: RequisicaoParaCriarSessao): Promise<RespostaParaCriarSessao>{
     return { email: "called on create session request"} 
  }

}
