
import { Request, Response } from 'express';
import ActivateAccountService from '../services/ActivateAccountService';
import UpdatePasswordService from '../services/UpdatePasswordService';


export default class UserController{
  public async updatePassword(request: Request, response: Response){
    const updateService = new UpdatePasswordService();
    const {email} = request.params;
    const result = await updateService.execute({email})

    return response.json(result)
  }
  public async activateAccount(request: Request, response: Response){
    const activateService = new ActivateAccountService()
    const {email} = request.params;
    const result = await activateService.execute({email});
    return response.json(result)

  }
  public async deactivateAccount(request: Request, response: Response){
    const deactivateService = new ActivateAccountService()
    const {email} = request.params;
    const result = await deactivateService.execute({email});
    return response.json(result)

  }
}
