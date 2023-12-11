import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import {  UpdatePasswordRequest, UpdatePasswordResponse } from "../../../types/services/user";



export default class ServicoParaAtualizarSenha extends ServicoAbstrato<UpdatePasswordRequest, UpdatePasswordResponse>{

  public async executar(parameters: UpdatePasswordRequest): Promise<UpdatePasswordResponse>{
    return { email: "called on update password service" }
      
  }
}
