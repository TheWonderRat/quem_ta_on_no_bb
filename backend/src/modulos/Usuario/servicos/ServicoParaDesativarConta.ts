import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import {  RequisicaoParaDesativarConta, RespostaParaDesativarConta} from "src/tipos/servicos/usuario";



export default class ServicoParaDesativarConta extends ServicoAbstrato<RequisicaoParaDesativarConta, RespostaParaDesativarConta>{

  public async executar(parameters: RequisicaoParaDesativarConta): Promise<RespostaParaDesativarConta>{
    return { email: "called on deactivate account service" }
      
  }
}
