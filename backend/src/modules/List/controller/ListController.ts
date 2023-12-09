import { Request, Response } from "express";
import { ListResponse } from "src/types/services/list";
import ListService from "../services/ListService";



export default class ListController{
  //todo:: criar e declarar declarar o tipo de retorno
  public async listar(request: Request, response: Response){

    const { email } = request.params;

    const service = new ListService();
    const result = await service.execute({email})

    return response.json(result)

  }
}
