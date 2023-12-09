import AbstractService from "src/shared/service/AbstractService";
import {  ActivateAccountRequest, ActivateAccountResponse } from "src/types/services/user";



export default class ActivateAccountService extends AbstractService<ActivateAccountRequest, ActivateAccountResponse>{

  public async execute(parameters: ActivateAccountRequest): Promise<ActivateAccountResponse>{
    return { email: "called on activate account service" }
  }
}
