import { Request, Response } from "express";
import { ServicoParaListarORanking } from "../servicos/ServicoParaListarORanking";



export class ControladorDoRanking{
  //todo:: criar e declarar declarar o tipo de retorno
  public async listarRanking(request: Request, response: Response){

    const { aprovados, pagina, tipoRanking, situacao, cidade, diretoria, turma } = request.params;

    const service = new ServicoParaListarORanking();
    const result = await service.executar({
      aprovados: Number(aprovados), 
      pagina: Number(pagina), 
      tipoRanking, 
      situacao, 
      cidade, 
      diretoria, 
      turma: Number(turma)
    });

    return response.json(result)

  }
}
