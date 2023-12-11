import AbstractService from "../../../compartilhados/servico/ServicoAbstrato";
import { CreateSessionRequest, CreateSessionResponse} from "../../../types/services/session";

export default class ServicoParaCriarSessao extends AbstractService<CreateSessionRequest, CreateSessionResponse>{

  public async executar(parameters: CreateSessionRequest): Promise<CreateSessionResponse>{
     return { email: "called on create session request"} 
  }

}
