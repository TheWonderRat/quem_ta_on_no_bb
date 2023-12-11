import ServicoAbstrato from "../../../compartilhados/servico/ServicoAbstrato";
import { ListRequest, ListResponse } from '../../../types/services/list'


export class ServicoParaListarORanking extends ServicoAbstrato<ListRequest, ListResponse>{

  public async executar(parameters: ListRequest): Promise<ListResponse>{
    return { email: "called on list request"}    
  }

}
