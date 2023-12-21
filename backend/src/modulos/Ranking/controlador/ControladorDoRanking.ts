import { Request, Response } from 'express';
import ServicoParaListarORanking from '../servicos/ServicoParaListarORanking';

export default class ControladorDoRanking {
  //  TODO:: criar e declarar declarar o tipo de retorno
  public async listarRanking(request: Request, response: Response) {

    const { aprovados, pagina, lista, situacao, cidade, diretoria, turma } = request.query;

    const service = new ServicoParaListarORanking();

    const result = await service.executar({
      aprovados: Number(aprovados),
      pagina: Number(pagina),
      tipoRanking: lista!!.toString(),//  possivel pois o celebrate faz a validacao
      situacao: situacao?.toString(),
      cidade: cidade?.toString(),
      diretoria: diretoria?.toString(),
      turma: Number(turma),
    });

    return response.json(result);
  }
}
