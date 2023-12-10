import AbstractService from "../../../shared/service/AbstractService";
import { ListRequest, ListResponse } from '../../../types/services/list'


export default class ListService extends AbstractService<ListRequest, ListResponse>{

  public async execute(parameters: ListRequest): Promise<ListResponse>{
    return { email: "called on list request"}    
  }

}
