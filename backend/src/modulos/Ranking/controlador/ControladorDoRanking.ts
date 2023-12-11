import { Request, Response } from "express";
import { ListResponse } from "src/types/services/list";
import { ServicoParaListarORanking } from "../servicos/ServicoParaListarORanking";



export class ControladorDoRanking{
  //todo:: criar e declarar declarar o tipo de retorno
  public async listarRanking(request: Request, response: Response){

    const { email } = request.params;

    const service = new ServicoParaListarORanking();
    const result = await service.executar({email})

    return response.json(result)

  }
}
