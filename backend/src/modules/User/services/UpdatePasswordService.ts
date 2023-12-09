import AbstractService from "src/shared/service/AbstractService";
import {  UpdatePasswordRequest, UpdatePasswordResponse } from "src/types/services/user";



export default class UpdatePasswordService extends AbstractService<UpdatePasswordRequest, UpdatePasswordResponse>{

  public async execute(parameters: UpdatePasswordRequest): Promise<UpdatePasswordResponse>{
    return { email: "called on update password service" }
      
  }
}
