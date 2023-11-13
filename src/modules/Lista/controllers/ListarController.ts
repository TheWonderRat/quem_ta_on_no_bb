import { Request, Response, NextFunction } from 'express'

import ListarService from '../services/ListarService';

export default class ListarController{

  async listar(request: Request, response:Response, nextFunction: NextFunction): Promise<Response>{ 
		const listarGeral = new ListarService();
    const{candidatos, pagina,lista, diretoria, cidade, situacao, turma } = request.query;
    //o celebrate garante que sempre serao numeros

		const users = await listarGeral.execute({ 
      candidatos: Number(candidatos),
      pagina: Number(pagina), 
      lista: lista?.toString(), 
      diretoria: diretoria?.toString(),
      cidade: cidade?.toString(),
      turma: Number(turma),
      situacao: situacao?.toString()
    });
		return response.json(users);
	}
}


