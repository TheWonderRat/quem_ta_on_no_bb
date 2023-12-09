
import { Request, Response } from 'express'
import CreateSessionService from '../services/CreateSessionService'

export default class SessionController{

  public async autenticar(request: Request, response: Response){

    const sessionService = new CreateSessionService()
    const {email} = request.params;
    const result = await sessionService.execute({email});
    return response.json(result)
  }
}
