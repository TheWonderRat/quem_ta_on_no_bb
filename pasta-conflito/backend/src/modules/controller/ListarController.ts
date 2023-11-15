// libraries
import { Request, Response } from 'express';

// Service
import { ListarService } from '../service/exporter';

export default class ListarController {
  public static async listar(request: Request, response:Response): Promise<Response> {
    const { candidatos, pagina, lista, diretoria, cidade, situacao, turma } = request.query;
    // o celebrate garante que sempre serao numeros

    const users = await ListarService.execute({
      candidatos: Number(candidatos),
      pagina: Number(pagina),
      lista: lista?.toString(),
      diretoria: diretoria?.toString(),
      cidade: cidade?.toString(),
      turma: Number(turma),
      situacao: situacao?.toString(),
    });
    return response.json(users);
  }
}
