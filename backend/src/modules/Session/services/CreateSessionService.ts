import AbstractService from "../../../shared/service/AbstractService";
import { CreateSessionRequest, CreateSessionResponse} from "../../../types/services/session";

export default class CreateSessionService extends AbstractService<CreateSessionRequest, CreateSessionResponse>{

  public async execute(parameters: CreateSessionRequest): Promise<CreateSessionResponse>{
     return { email: "called on create session request"} 
  }

}
