import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import {  RequisicaoParaAtivarConta, RespostaParaAtivarConta } from "../../../tipos/servicos/usuario";



export default class ServicoParaAtivarConta extends ServicoAbstrato<RequisicaoParaAtivarConta, RespostaParaAtivarConta>{

  public async executar(parameters: RequisicaoParaAtivarConta): Promise<RespostaParaAtivarConta>{
    return { email: "called on activate account service" }
  }
}
