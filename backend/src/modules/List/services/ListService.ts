import AbstractService from "src/shared/service/AbstractService";
import { ListRequest, ListResponse } from 'src/types/services/list'


export default class ListService extends AbstractService<ListRequest, ListResponse>{

  public async execute(parameters: ListRequest): Promise<ListResponse>{
    return { email: "called on list request"}    
  }

}
