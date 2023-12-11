import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import {  DeactivateAccountRequest, DeactivateAccountResponse } from "src/types/services/user";



export default class ServicoParaDesativarConta extends ServicoAbstrato<DeactivateAccountRequest, DeactivateAccountResponse>{

  public async executar(parameters: DeactivateAccountRequest): Promise<DeactivateAccountResponse>{
    return { email: "called on deactivate account service" }
      
  }
}
