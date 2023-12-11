import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import {  ActivateAccountRequest, ActivateAccountResponse } from "../../../types/services/user";



export default class ServicoParaAtivarConta extends ServicoAbstrato<ActivateAccountRequest, ActivateAccountResponse>{

  public async executar(parameters: ActivateAccountRequest): Promise<ActivateAccountResponse>{
    return { email: "called on activate account service" }
  }
}
