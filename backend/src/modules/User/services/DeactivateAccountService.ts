import AbstractService from "src/shared/service/AbstractService";
import {  DeactivateAccountRequest, DeactivateAccountResponse } from "src/types/services/user";



export default class DeactivateAccountService extends AbstractService<DeactivateAccountRequest, DeactivateAccountResponse>{

  public async execute(parameters: DeactivateAccountRequest): Promise<DeactivateAccountResponse>{
    return { email: "called on deactivate account service" }
      
  }
}
